export interface StackItem {
  id: number;
  text: string | number;
  style: string;
}

export const remove = (array: StackItem[], item: StackItem) => {
  const newArr = [...array];

  newArr.splice(
    newArr.findIndex((element: StackItem) => element === item),
    1
  );

  return newArr;
};

export const add = (array: StackItem[], text: string, style: string) => {
  const id = array.length;

  return [...array, { id, text, style }];
};
