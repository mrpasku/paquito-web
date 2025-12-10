from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import track, health

app = FastAPI(title="Paquito Web API")

# Configure CORS
origins = [
    "http://localhost:3000",
    "https://paquito-web.vercel.app",  # Add production domain later
    "*" # Allow all for now during dev
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(track.router)
app.include_router(health.router)

@app.get("/")
def read_root():
    return {"message": "Paquito Web API is running"}
