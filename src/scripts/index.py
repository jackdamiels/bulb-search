import sys
import json
from txtai.embeddings import Embeddings


def is_supported_entry_type(type_id):
    return type_id in [3, 12]


def process_entries(entries):
    result = []
    for entry in entries:
        if is_supported_entry_type(entry['typeId']):
            id = entry['id']
            title = entry['title']
            description = entry['description']
            slug = entry['slug']
            url = entry['url']
            short_faq = entry['shortFaq']

            for key in short_faq:
                entry_id = str(id) + key
                faq_entry = short_faq[key]

                fields = faq_entry['fields']
                question = fields['question']
                answer = fields['answer']

                text = question + answer

                result.append({
                    "id": entry_id,
                    "title": title,
                    "description": description,
                    "slug": slug,
                    "url": url,
                    "text": text
                })

    return result


def create_embeding_index(documents, save_to):
    embeddings = Embeddings(
        {"path": "sentence-transformers/nli-mpnet-base-v2", "content": True})
    embeddings.index([(uid, {"text": document['text'], "title": document["title"], "slug": document["slug"]}, None)
                     for uid, document in enumerate(documents)])

    embeddings.save(save_to)

    result = embeddings.search("WIFI", 1)
    print(result)


def main():
    print(sys.argv)
    entries_path = sys.argv[1]
    index_path = sys.argv[2]
    if entries_path and index_path:
        file = open(entries_path)
        entries_json = json.load(file)
        documents = process_entries(entries_json)
        create_embeding_index(documents, index_path)
        file.close()


if __name__ == "__main__":
    main()

# data = ["US tops 5 million confirmed virus cases",
#         "Canada's last fully intact ice shelf has suddenly collapsed, forming a Manhattan-sized iceberg",
#         "Beijing mobilises invasion craft along coast as Taiwan tensions escalate",
#         "The National Park Service warns against sacrificing slower friends in a bear attack",
#         "Maine man wins $1M from $25 lottery ticket",
#         "Make huge profits without work, earn up to $100,000 a day"]

# # Create embeddings index with content enabled. The default behavior is to only store indexed vectors.
# embeddings = Embeddings(
#     {"path": "sentence-transformers/nli-mpnet-base-v2", "content": True, "objects": True})

# embeddings.index([(uid, {"text": text, "length": len(text)}, None)
#                  for uid, text in enumerate(data)])

# print(embeddings.search("select text, score from txtai where similar('hiking danger') and score >= 0.15"))