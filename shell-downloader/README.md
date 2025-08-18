# Downloader

This is a shellscript tool to download historical reports from The Economist.

## Requirements

* jq
* curl

## Flow

1. Ensure your query text
2. Ensure the PAGE variable from 1 and the DOC_COUNT is 0.
3. make a request to list API, example:

```
  https://archive.org/services/search/beta/page_production/?service_backend=fts&user_query=${USER_QUERY}&page_type=collection_details&page_target=pub_economist&hits_per_page=100&page=${PAGE}&sort=date%3Aasc&aggregations=false&uid=R%3Ad8466fbd5ec58055916a-S%3A3711c14d0804f98be520-P%3A1-K%3Ah-T%3A1755494271483&client_url=https%3A%2F%2Farchive.org%2Fdetails%2Fpub_economist%3Ftab%3Dcollection%26query%3D${USER_QUERY}%26sin%3DTXT%26sort%3Ddate
```

The output of the 1st step is stored to the USER_QUERY variable and put it into the URL. The 2nd `USER_QUERY` must be encoded with URI component.

4. Loop the returned content for download the text and PDF files. A simplified example:

```json
{
    "uid": "R:d8466fbd5ec58055916a-S:3711c14d0804f98be520-P:1-K:h-T:1755494271483",
    "version": "1v",
    "elapsed_secs": 0.06458806991577148,
    "response": {
        "body": {
            "hits": {
                "total": 1128,
                "returned": 100,
                "hits": [
                    {
                        "index": "fts_main",
                        "service_backend": "fts",
                        "hit_type": "text",
                        "fields": {
                            "identifier": "sim_economist_1844-07-06_1_45",
                            "filename": "sim_economist_1844-07-06_1_45_hocr_searchtext.txt.gz",
                            "file_basename": "sim_economist_1844-07-06_1_45",
                            "page_num": 1,
                            "file_creation_mtime": 1625751593,
                            "updated_on": "2024-03-03T01:36:04Z",
                            "created_on": "2021-07-08T14:03:23Z",
                            "mediatype": "texts",
                            "title": "The Economist 1844-07-06: Vol 1 Iss 45",
                            "date": "1844-07-06T00:00:00Z",
                            "publicdate": "2020-10-23T20:30:21Z",
                            "downloads": 57,
                            "collection": [
                                "pub_economist",
                                "sim_microfilm",
                                "periodicals"
                            ],
                            "subject": [
                                "Business And Economics--Economic Situation And Conditions",
                                "Business And Economics--Economic Systems And Theories, Economic History",
                                "Magazines",
                                "microfilm"
                            ],
                            "year": 1844,
                            "addeddate": "2020-10-23T20:30:21Z",
                            "issue": "45",
                            "source": "IA1532329-06",
                            "description": [
                                "The Economist 1844-07-06: Volume 1 , Issue 45. Digitized from IA1532329-06 . Previous issue: sim_economist_1844-06-29_1_44 . Next issue: sim_economist_1844-07-13_1_46 ."
                            ],
                            "result_in_subfile": false,
                            "__href__": "/details/sim_economist_1844-07-06_1_45?q=formosa"
                        },
                        "highlight": {
                            "text": [
                                "Corfu Znt Parga Farrant Ja kson.. ‘ISI 1 July {{{Formosa}}} Lo idley Anderson LO. «ane Fon ambuco Emily Foy"
                            ]
                        }
                    }
                ]
            }
        }
    }
}
```

Please note that we removed some unrelated informations. The loop starts from `response.body.hits.hits`. Each execution,
we do the followings:

* Extracting the identifier field, `fields.identifier` into the `DOC_ID` variable
* Saving the hit payload into `{DOC_ID}.json`.
* Download the HTML content from `https://archive.org/stream/${DOC_ID}/${DOC_ID}_djvu.txt` to `${DOC_ID}.txt.html` file
* Download the PDF content from `https://archive.org/download/sim_economist_1844-07-06_1_45/sim_economist_1844-07-06_1_45.pdf` to `${DOC_ID}.pdf` file
* Increase the `DOC_COUNT` variable
* After each download, sleep 3 seconds.

If there is an error, save the error text to `${DOC_ID}.{step-index}.error.txt` and continue the steps.

5. After loop of each hits, we check if the `DOC_COUNT` is the same as `response.body.hits.total`. If not, increase the `PAGE` variable and go back to step 3.

## How to Use it

* Install the required software `brew install jq`. Suppose the `curl` was already installed. If you don't have it, `brew install curl`
* Download the list: `fetch-list.sh XYZ`
  * During the download, you will see the page_{n}_response.json file. The `{n}` is a number. We page the whole content in 100 records per file.
* Download the detail content page by page: `download-content.sh downloads/page_{n}_response.json`
