const normalize = {
    normalizeRecipes(recipes) {
        if (Array.isArray(recipes)) {
            return recipes.map(e => ({
                id: e._id,
                name: e.name,
                difficulty: e.difficulty,
                rating: e.rating,
                preparation: e.preparation,
                img: e.img,
                ingredients: e.ingredients.map(i => ({
                    ingredient: { id: i.ingredient._id, name: i.ingredient.name },
                    amount: i.amount,
                    unit: { id: i.unit._id, name: i.unit.name }
                })),
                category: e.category.map(j => ({
                    id: j._id,
                    name: j.name
                })),
                premium: e.premium === true ? "Premium" : "Free",
                availability: e.availability === true ? "Available" : "Unavailable"
            }));
        } else {
            return normalize.normalizeRecipes([recipes])[0];
        }
    },

    normalizeIngredients(ingredient) {
        if (Array.isArray(ingredient)) {
            return ingredient.map(e => ({
                id: e._id,
                name: e.name
            }));
        } else {
            return normalize.normalizeIngredients([ingredient])[0];
        }
    },

    normalizeUnits(units) {
        return normalize.normalizeIngredients(units);
    },

    normalizeCategories(category){
        return normalize.normalizeIngredients(category);
    }
}

module.exports = normalize;