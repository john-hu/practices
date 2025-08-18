#!/bin/bash
# This script is used to download files from the Internet Archive based on a user query.

# Check for required dependencies
command -v jq >/dev/null 2>&1 || { echo >&2 "Error: jq is required but not installed. Please install it."; exit 1; }
command -v curl >/dev/null 2>&1 || { echo >&2 "Error: curl is required but not installed. Please install it."; exit 1; }

# Create download directory if it doesn't exist
DOWNLOAD_DIR="downloads"
mkdir -p "$DOWNLOAD_DIR"

# Function to URL encode a string
urlencode() {
  local string="$1"
  local encoded=""
  local pos c o

  for (( pos=0; pos<${#string}; pos++ )); do
    c=${string:$pos:1}
    case "$c" in
      [-_.~a-zA-Z0-9] ) o="$c" ;;
      * ) printf -v o '%%%02X' "'$c"
    esac
    encoded+="$o"
  done
  echo "$encoded"
}

# Get user query
if [ "$#" -eq 0 ]; then
  echo "Please enter your search query:"
  read USER_QUERY
else
  USER_QUERY="$1"
fi

echo "Searching for: $USER_QUERY"

# Initialize variables
PAGE=1
DOC_COUNT=0
TOTAL_HITS=0
ENCODED_QUERY=$(urlencode "$USER_QUERY")

# Function to handle errors
handle_error() {
  local step="$1"
  local doc_id="$2"
  local error_msg="$3"

  echo "Error at step $step for document $doc_id: $error_msg"
  echo "$error_msg" > "$DOWNLOAD_DIR/${doc_id}.${step}.error.txt"
}

# Main download loop
while true; do
  echo "Fetching page $PAGE..."

  # Construct API URL
  API_URL="https://archive.org/services/search/beta/page_production/?service_backend=fts&user_query=${USER_QUERY}&page_type=collection_details&page_target=pub_economist&hits_per_page=100&page=${PAGE}&sort=date%3Aasc&aggregations=false&uid=R%3Ad8466fbd5ec58055916a-S%3A3711c14d0804f98be520-P%3A1-K%3Ah-T%3A1755494271483&client_url=https%3A%2F%2Farchive.org%2Fdetails%2Fpub_economist%3Ftab%3Dcollection%26query%3D${ENCODED_QUERY}%26sin%3DTXT%26sort%3Ddate"

  # Make API request and save response
  RESPONSE=$(curl -s "$API_URL")

  # Check if response is valid JSON
  if ! echo "$RESPONSE" | jq . >/dev/null 2>&1; then
    echo "Error: Invalid JSON response from API."
    exit 1
  fi

  # Save the response to a temp file
  echo "$RESPONSE" > "$DOWNLOAD_DIR/page_${PAGE}_response.json"

  # Extract total hits and returned hits
  TOTAL_HITS=$(echo "$RESPONSE" | jq -r '.response.body.hits.total')
  RETURNED_HITS=$(echo "$RESPONSE" | jq -r '.response.body.hits.returned')

  echo "Found $TOTAL_HITS total documents, $RETURNED_HITS from this page..."

  DOC_COUNT=$((DOC_COUNT+RETURNED_HITS))
  # Check if we've processed all documents
  if [ "$DOC_COUNT" -ge "$TOTAL_HITS" ] || [ "$RETURNED_HITS" -lt 100 ]; then
    echo "All documents processed. Total: $DOC_COUNT"
    break
  else
    # Move to next page
    PAGE=$((PAGE+1))
    echo "Moving to page $PAGE..."
    # Sleep to avoid hitting rate limits
    echo "Waiting 3 seconds before next download..."
    sleep 3
  fi
done

echo "Download completed. Files saved in $DOWNLOAD_DIR directory."
