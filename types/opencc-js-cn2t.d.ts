declare module "opencc-js/cn2t" {
  export function Converter(config: {
    from: string;
    to: string;
  }): (text: string) => string;
}
