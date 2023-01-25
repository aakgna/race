const petsDB = {
    dogs: { name: "Dogs", voice: "Woof!", avatar: "🐶" },
    cats: { name: "Cats", voice: "Miauuu", avatar: "🐱" }
};

export function getPet(type) {
    const delay = type === "cats" ? 3500 : 500;
    return new Promise(resolve => {
        // immulate fetch call
        setTimeout(() => {
            resolve(petsDB[type]);
        }, delay);
    });
}
