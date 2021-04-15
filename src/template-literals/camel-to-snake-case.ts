type CamelToSnakeCase<T> = T extends `${infer Start}${infer Word}${infer Rest}`
  ? Word extends Capitalize<Word>
    ? `${Start}_${Lowercase<Word>}${CamelToSnakeCase<Rest>}`
    : `${Rest}`
  : T;

const x: CamelToSnakeCase<"aBcDe"> = "a_bc_de";

type SnakeToCamelCase<T extends string> = T extends `${infer Front}_${infer Back}`
  ? `${Front}${Capitalize<SnakeToCamelCase<Back>>}`
  : T;

type Back<T> = T extends SnakeToCamelCase<infer X> ? X : never;

interface SnakeObject {
  some_key_with_multiple_underscores: boolean;
  other_key: string;
}

const y: SnakeToCamelCase<keyof SnakeObject> = "someKeyWithMultipleUnderscores";

export {};
