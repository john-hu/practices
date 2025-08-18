#!/bin/bash
# This script is used to download files from the Internet Archive based on a user query.

# Check for required dependencies
command -v jq >/dev/null 2>&1 || { echo >&2 "Error: jq is required but not installed. Please install it."; exit 1; }
command -v curl >/dev/null 2>&1 || { echo >&2 "Error: curl is required but not installed. Please install it."; exit 1; }

# Create download directory if it doesn't exist
DOWNLOAD_DIR="downloads"
mkdir -p "$DOWNLOAD_DIR"

# Get user query
if [ "$#" -eq 0 ]; then
  echo "Please include the list file. [page_1_response.json]"
  exit -1
else
  RESPONSE_FILE="$1"
fi

echo "Load the JSON file: $RESPONSE_FILE"

print() {
  local message="$1"
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $message"
}

# Function to handle errors
handle_error() {
  local step="$1"
  local doc_id="$2"
  local error_msg="$3"

  print "Error at step $step for document $doc_id: $error_msg"
  print "$error_msg" > "$DOWNLOAD_DIR/${doc_id}.${step}.error.txt"
}
# Check if response is valid JSON
if ! cat "$RESPONSE_FILE" | jq . >/dev/null 2>&1; then
  print "Error: Invalid JSON response from API."
  exit 1
fi

# Extract total hits and returned hits
TOTAL_HITS=$(cat "$RESPONSE_FILE" | jq -r '.response.body.hits.total')
RETURNED_HITS=$(cat "$RESPONSE_FILE" | jq -r '.response.body.hits.returned')
HITS_PER_PAGE=$(cat "$RESPONSE_FILE" | jq -r '.request.client_request_parameters.hits_per_page')
PAGE_INDEX=$(cat "$RESPONSE_FILE" | jq -r '.request.client_request_parameters.page')
# Initialize variables
DOC_COUNT=$(((PAGE_INDEX-1) * HITS_PER_PAGE))

print "Found $TOTAL_HITS total documents, processing from $DOC_COUNT, length $RETURNED_HITS from this page..."

# Process each hit
for i in $(seq 0 $((RETURNED_HITS-1))); do
  # Sleep to avoid hitting rate limits
  print "Waiting 3 seconds before next download..."
  sleep 3
  # Extract document identifier
  DOC_ID=$(cat "$RESPONSE_FILE" | jq -r ".response.body.hits.hits[$i].fields.identifier")

  if [ -z "$DOC_ID" ] || [ "$DOC_ID" = "null" ]; then
    print "Warning: Could not extract document ID for item $i. Skipping."
    continue
  fi

  print "Processing document $((DOC_COUNT+1))/$TOTAL_HITS: $DOC_ID"

  # Save hit payload to JSON file
  cat "$RESPONSE_FILE" | jq ".response.body.hits.hits[$i]" > "$DOWNLOAD_DIR/${DOC_ID}.json" ||
    handle_error "json_save" "$DOC_ID" "Failed to save JSON data"

  # Download HTML content
  HTML_URL="https://archive.org/stream/${DOC_ID}/${DOC_ID}_djvu.txt"
  print "Downloading text from $HTML_URL"
  curl -L -s "$HTML_URL" -o "$DOWNLOAD_DIR/${DOC_ID}.txt.html" ||
    handle_error "html_download" "$DOC_ID" "Failed to download HTML content"

  # Download PDF content
  PDF_URL="https://archive.org/download/${DOC_ID}/${DOC_ID}.pdf"
  print "Downloading PDF from $PDF_URL"
  curl -L -s "$PDF_URL" -o "$DOWNLOAD_DIR/${DOC_ID}.pdf" ||
    handle_error "pdf_download" "$DOC_ID" "Failed to download PDF content"

  # Increment document count
  DOC_COUNT=$((DOC_COUNT+1))
done

print "Download completed. Files saved in $DOWNLOAD_DIR directory."
