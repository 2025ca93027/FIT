# justfile

set dotenv-load := true
set shell := ["bash", "-eu", "-o", "pipefail", "-c"]

# -----------------------
# Variables
# -----------------------
app := "FIT.Api"
data := "FIT.Data"
runtime := "linux-x64"
config := "Release"
http_port := "8080"
image_api := "fit-api"
image_migrate := "fit-migrate"

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

ef *args:
    dotnet ef {{args}} --startup-project src/{{app}}/{{app}}.csproj --project src/{{data}}/{{data}}.csproj

# -----------------------
# Docker
# -----------------------

docker-build:
    docker build --target api -t {{image_api}} .
    docker build --target migrate -t {{image_migrate}} .

docker-run:
    docker run --rm -p {{http_port}}:{{http_port}} -e ASPNETCORE_HTTP_PORTS={{http_port}} {{image_api}}

up:
    docker compose -f compose.dev.yaml up -d

down *args:
    docker compose -f compose.dev.yaml down {{args}}

# -----------------------
# Diagnostics
# -----------------------

info:
    @echo "App: {{app}}"
    @echo "Runtime: {{runtime}}"
    @echo "Config: {{config}}"
