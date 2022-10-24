import faker from "faker";

export const fakeNames = Array.from(Array(100000), () => {
  return faker.name.findName();
});
