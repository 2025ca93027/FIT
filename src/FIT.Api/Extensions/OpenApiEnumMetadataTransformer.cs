using System.Text.Json.Nodes;

using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi;

namespace FIT.Api.Extensions;

public sealed class OpenApiEnumMetadataTransformer : IOpenApiSchemaTransformer
{
    public Task TransformAsync(
        OpenApiSchema schema,
        OpenApiSchemaTransformerContext context,
        CancellationToken cancellationToken)
    {
        var type = context.JsonTypeInfo.Type;
        if (!type.IsEnum)
            return Task.CompletedTask;

        var names = Enum.GetNames(type).ToList();
        var values = Enum.GetValues(type).Cast<int>().ToList();

        schema.Type = JsonSchemaType.Integer;
        schema.Enum = [.. Enum.GetValues(type).Cast<int>().Select(v => JsonValue.Create(v))];

        // human-readable names
        var valueDesc = Enum.GetValues(type)
            .Cast<int>()
            .Select(v => $"{v} ({Enum.GetName(type, v)})");

        var description = string.Join(", ", valueDesc);

        schema.Description = string.IsNullOrWhiteSpace(schema.Description)
            ? description
            : schema.Description + "\n\n" + description;


        return Task.CompletedTask;
    }
}
