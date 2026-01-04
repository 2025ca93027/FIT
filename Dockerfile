FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS build
WORKDIR /source

COPY --link dotnet-tools.json .
COPY --link src/FIT.Api/FIT.Api.csproj src/FIT.Api/
COPY --link src/FIT.Core/FIT.Core.csproj src/FIT.Core/
COPY --link src/FIT.Data/FIT.Data.csproj src/FIT.Data/

RUN dotnet tool restore
ENV PATH="$PATH:/root/.dotnet/tools"

RUN dotnet restore src/FIT.Api/FIT.Api.csproj -r linux-x64

COPY --link src/. src/.

RUN dotnet publish src/FIT.Api/FIT.Api.csproj \
    -c Release \
    -r linux-x64 \
    --no-restore \
    -o /out/api

RUN dotnet ef migrations bundle \
    --project src/FIT.Data/FIT.Data.csproj \
    --startup-project src/FIT.Api/FIT.Api.csproj \
    --runtime linux-x64 \
    --configuration Release \
    --output /out/migrate-db

FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS api
WORKDIR /app

ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080

COPY --link --from=build /out/api .

ENTRYPOINT ["dotnet", "FIT.Api.dll"]

FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine AS migrate
WORKDIR /app

COPY --link --from=build /out/migrate-db .

ENTRYPOINT ["./migrate-db"]
