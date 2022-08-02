# Set base image
ARG BASE_IMAGE=neuml/txtai-cpu
FROM $BASE_IMAGE

# Copy configuration
COPY config.yml .

ENV CONFIG "config.yml"

# Run local API instance to cache models in container
RUN python -c "from txtai.api import API; API('config.yml', False)"

# Start server and listen on all interfaces
ENTRYPOINT ["uvicorn", "--host", "0.0.0.0", "txtai.api:app"]