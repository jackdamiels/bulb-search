import sys
from txtai.embeddings import Embeddings

embeddings = Embeddings(
    {"path": "sentence-transformers/nli-mpnet-base-v2", "content": True})


def main():
    question = sys.argv[1]

    embeddings.load("search_index.tar.xz")
    print("started .....")
    result = embeddings.search(
        f"select text, title, slug, score from txtai where similar('{question}') limit 1")
    print(result[0])


if __name__ == "__main__":
    main()
