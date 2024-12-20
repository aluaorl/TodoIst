export const generateTodos = (n = 1000) => {
  const severities = ["Срочно", "Средне", "Не срочно"];

  const todos = Array.from({ length: n }, (_, index) =>
    generateTodo(index, severities)
  );

  return todos;
};

const generateTodo = (index, severities) => ({
  id: Date.now() + index,
  title: getRandomString(),
  description: getRandomString(),
  completed: Math.random() > 0.5,
  severity: severities[Math.floor(Math.random() * severities.length)],
  createdAt: new Date().getTime(),
});

const getRandomString = () => Math.random().toString(36).substring(2, 10);
