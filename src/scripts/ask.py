import sys
from txtai.embeddings import Embeddings
from txtai.app import Application

embeddings = Embeddings(
    {"path": "sentence-transformers/nli-mpnet-base-v2", "content": True})


def main():
    question = sys.argv[1]

    app = Application("path: search_index.tar.xz")

    print("Created application")


if __name__ == "__main__":
    main()
