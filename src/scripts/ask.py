# uvicorn main:app --reload

import sys
from fastapi import FastAPI
import fastapi
from txtai.embeddings import Embeddings
from txtai.app import Application


from fastapi import FastAPI

app = FastAPI()

txtaiapp = Application("path: search_index.tar.xz")
print("Started textai app")


@app.get("/")
async def root():
    print(txtaiapp.count())
    return {"count": txtaiapp.count()}


# embeddings = Embeddings(
#     {"path": "sentence-transformers/nli-mpnet-base-v2", "content": True})


# def main():
#     question = sys.argv[1]

#     app = Application("path: search_index.tar.xz")

#     print("Created application")


# if __name__ == "__main__":
#     main()
