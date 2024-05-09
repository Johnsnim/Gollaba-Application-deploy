import ApiTemplate from "./ApiTemplate"
import MethodType from "./MethodType"

const ApiGateway = {
    /* v1 Apis
    // Favorites Controller
    makeFavorite: async (payload, token) => ApiTemplate.sendApi(MethodType.POST, `v1/favorites`, payload, token),
    deleteFavorite: async (favoritesId, token) =>
        ApiTemplate.sendApi(MethodType.DELETE, `v1/favorites/${favoritesId}`, null, token),
    getFavorites: async (token) => ApiTemplate.sendApi(MethodType.GET, `v1/favorites`, null, token),
    // Poll Controller
    createPoll: async (payload, token) => ApiTemplate.sendApiMultiPart(MethodType.POST, "/v1/polls", payload, token),
    getPolls: async (offset, limit, token) =>
        ApiTemplate.sendApi(MethodType.GET, `/v1/polls?limit=${limit}&offset=${offset * 15}`, null, token),
    searchPolls: async (offset, limit, title, token) =>
        ApiTemplate.sendApi(
            MethodType.GET,
            `/v1/polls?limit=${limit}&offset=${offset * 15}&title=${title}`,
            null,
            token
        ),
    getPoll: async (pollId) => ApiTemplate.sendApi(MethodType.GET, `/v1/polls/${pollId}`),
    vote: async (pollId, payload) => ApiTemplate.sendApi(MethodType.POST, `/v1/polls/${pollId}/vote`, payload),
    updatePoll: async (pollId, payload, token) =>
        ApiTemplate.sendApi(MethodType.POST, `v1/polls/${pollId}/update`, payload, token),
    myPolls: async (token) => ApiTemplate.sendApi(MethodType.GET, `/v1/polls/me`, null, token),
    topPolls: async (token) => ApiTemplate.sendApi(MethodType.GET, `/v1/polls/top`, null, token),
    trendingPolls: async (token) => ApiTemplate.sendApi(MethodType.GET, `/v1/polls/trending`, null, token),
    // User Controllers
    signupForm: async (payload) => ApiTemplate.sendApi(MethodType.POST, `v2/users`, payload),
    showUser: async (userId, token) => ApiTemplate.sendApi(MethodType.GET, `/v1/users/${userId}`, null, token),
    updateForm: async (formData, token) =>
        ApiTemplate.sendApiMultiPart(MethodType.POST, `v1/users/update`, formData, token),
    readCount: async (pollId) => ApiTemplate.sendApiMultiPart(MethodType.POST, `/v1/polls/${pollId}/read-count`),
    */

    // Favorites Controller
    makeFavorite: async (payload, token) => ApiTemplate.sendApi(MethodType.POST, `v2/favorites`, payload, token),
    deleteFavorite: async (payload, token) => ApiTemplate.sendApi(MethodType.DELETE, `v2/favorites`, payload, token),
    getFavorites: async (token) => ApiTemplate.sendApi(MethodType.GET, `v2/favorites/me`, null, token),
    // Poll Controller
    createPoll: async (payload, token) => ApiTemplate.sendApiMultiPart(MethodType.POST, "/v2/polls", payload, token),
    getPolls: async (page, limit, token) =>
        ApiTemplate.sendApi(MethodType.GET, `/v2/polls?page=${page}&size=${limit}`, null, token),
    searchPolls: async (offset, limit, title, token) =>
        ApiTemplate.sendApi(
            MethodType.GET,
            `/v1/polls?limit=${limit}&offset=${offset * 15}&title=${title}`,
            null,
            token
        ),
    getPoll: async (pollId) => ApiTemplate.sendApi(MethodType.GET, `/v2/polls/${pollId}`),
    vote: async (payload, token) => ApiTemplate.sendApi(MethodType.POST, `/v2/voting`, payload, token),
    voteEdit: async (pollId, payload, token) =>
        ApiTemplate.sendApi(MethodType.PUT, `/v2/voting/${pollId}`, payload, token),
    isVoted: async (payload, token) => ApiTemplate.sendApi(MethodType.POST, `/v2/voting/check`, payload, token),
    chosenItem: async (pollHashId, token) =>
        ApiTemplate.sendApi(MethodType.GET, `/v2/voting/me?pollHashId=${pollHashId}`, null, token),
    updatePoll: async (pollId, payload, token) =>
        ApiTemplate.sendApi(MethodType.POST, `v1/polls/${pollId}/update`, payload, token),
    getMyPolls: async (page, limit, token) =>
        ApiTemplate.sendApi(MethodType.GET, `/v2/polls/me?page=${page}&size=${limit}`, null, token),
    topPolls: async (token) => ApiTemplate.sendApi(MethodType.GET, `/v2/polls/top?limit=10`, null, token),
    trendingPolls: async (token) => ApiTemplate.sendApi(MethodType.GET, `/v2/polls/trending?limit=20`, null, token),
    // User Controller
    signupForm: async (formData) => ApiTemplate.sendApiMultiPart(MethodType.POST, `v1/signup`, formData),
    showUser: async (userId, token) => ApiTemplate.sendApi(MethodType.GET, `/v2/users/me`, null, token),
    changeName: async (payload, token) => ApiTemplate.sendApi(MethodType.PUT, `/v2/users`, payload, token),
    changeImage: async (payload, token) =>
        ApiTemplate.sendApiMultiPart(MethodType.POST, `v2/users/change-profile`, payload, token),
    updateUser: async (payload, token) => ApiTemplate.sendApiMultiPart(MethodType.PUT, `v2/users`, payload, token),
    readCount: async (pollId) => ApiTemplate.sendApiMultiPart(MethodType.POST, `/v2/polls/${pollId}/read`),
}

export default ApiGateway
