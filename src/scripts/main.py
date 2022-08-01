# uvicorn main:app

from typing import Union
from enum import Enum

from fastapi import FastAPI
from txtai.app import Application

app = FastAPI()

txtaiapp = Application("path: search_index.tar.xz")

@app.get("/search")
async def search(query: str, limit: int = 10, include: Union[str, None] = None):

    # select text, score from txtai where similar('hiking danger') and score >= 0.15

    result = txtaiapp.search(query, limit)
    return {"data": result}
