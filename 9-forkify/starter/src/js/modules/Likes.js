export default class Likes {

    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = { id, title, author, img }
        this.likes.push(like);
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        // https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
        // [2,4,8] splice (1,1) -- > return [4] and mutate orignal array in [2,8]
        //  insteadof
        // [2,4,8] plice (1,1) -- > return [4] and NOT mutate orignal array in [2,4,8]
        this.likes.splice(index, 1); // we want only remove one element
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1
    }

    getNumLikes() {
        return this.likes.length;
    }
}