import { assertEquals } from "jsr:@std/assert";

function add(a: number, b: number): number {
  return a + b;
}

Deno.test("basic test framework", () => {
  // Arrange - set up the test data
  const a = 1;
  const b = 2;

  // Act - call the function being tested
  const result = add(a, b);

  // Assert - verify the result is what we expect
  assertEquals(result, 3);
});
