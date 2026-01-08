{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=release-25.11";
  };

  outputs =
    { nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = nixpkgs.legacyPackages.${system};
    in
    {
      devShells.${system}.default = pkgs.mkShellNoCC {
        packages = with pkgs; [
          dotnetCorePackages.dotnet_10.sdk
          dotnetCorePackages.dotnet_10.aspnetcore

          nixd
          nixfmt-rfc-style
        ];

        LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
          pkgs.icu
        ];
      };
    };
}
