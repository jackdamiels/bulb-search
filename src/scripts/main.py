# uvicorn main:app

from fastapi import FastAPI
from txtai.app import Application

app = FastAPI()


txtaiapp = Application("path: search_index.tar.xz")
print("Started textai app")


@app.get("/query")
async def query(query: str):
    result = txtaiapp.search(query)
    return {"count": result}

# print(embeddings.search("select text, score from txtai where similar('hiking danger') and score >= 0.15"))

