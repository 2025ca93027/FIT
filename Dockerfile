FROM mcr.microsoft.com/dotnet/sdk:10.0-alpine AS build
WORKDIR /source

COPY --link src/FIT.Api/FIT.Api.csproj src/FIT.Api/
COPY --link src/FIT.Core/FIT.Core.csproj src/FIT.Core/
COPY --link src/FIT.Data/FIT.Data.csproj src/FIT.Data/

RUN dotnet restore src/FIT.Api/FIT.Api.csproj -r linux-x64

COPY --link src/. src/.

RUN dotnet publish src/FIT.Api/FIT.Api.csproj \
    -c Release \
    -r linux-x64 \
    --no-restore \
    -o /app

FROM mcr.microsoft.com/dotnet/aspnet:10.0-alpine
WORKDIR /app

ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080

COPY --link --from=build /app .

ENTRYPOINT ["dotnet", "FIT.Api.dll"]
