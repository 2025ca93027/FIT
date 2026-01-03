# justfile

set dotenv-load := true
set shell := ["bash", "-eu", "-o", "pipefail", "-c"]

# -----------------------
# Variables
# -----------------------
app := "FIT.Api"
runtime := "linux-x64"
config := "Release"
http_port := "8080"
image-name := "fit-api"

# -----------------------
# Local development
# -----------------------

run:
    dotnet run --project src/{{app}}/{{app}}.csproj

watch:
    dotnet watch --project src/{{app}}/{{app}}.csproj

restore:
    dotnet restore src/{{app}}/{{app}}.csproj -r {{runtime}}

build:
    dotnet build -c {{config}}

publish: restore
    dotnet publish src/{{app}}/{{app}}.csproj \
        -c {{config}} \
        -r {{runtime}} \
        --no-restore

clean:
    rm -rf artifacts/bin artifacts/obj

# -----------------------
# Docker
# -----------------------

docker-build:
    docker build -f Dockerfile -t {{image-name}} .

docker-run:
    docker run --rm -p {{http_port}}:{{http_port}} {{image-name}}

# -----------------------
# Diagnostics
# -----------------------

info:
    @echo "App: {{app}}"
    @echo "Runtime: {{runtime}}"
    @echo "Config: {{config}}"
