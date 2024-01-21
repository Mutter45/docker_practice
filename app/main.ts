import reactive from "./package/reactive";
const obj = reactive({
  name: "Mutter",
  age: 12,
  sex: "man",
  isCool: true,
});
console.log(obj);
obj.on("ageUpdate", (newVal, oldVal) => {
  console.log(newVal, oldVal, "我是age属性，我被更新了!");
});
obj.on("nameUpdate", (newVal, oldVal) => {
  console.log(newVal, oldVal, "我是name属性，我被更新了!");
});
obj.state.age = 24;
obj.state.name = "Mutter45";
obj.state.isCool = false;
console.log(obj);
