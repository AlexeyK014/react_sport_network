import { APIResponseType, ResultCodeEnum } from "../API/api"
import { usersAPI } from "../API/users-api"
import { actions, followTC } from "./users-reducer"

jest.mock("../API/users-api")
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn() // создаем фейковый диспатч
const getStateMock = jest.fn() 

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersAPIMock.follow.mockClear()
    usersAPIMock.unfollow.mockClear()
})

const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    data: {},
    messages: []
}

// usersAPI.follow.mockResolveValue(apiResponse)



test('thunk follow succsess', async() => {
    const thunk = followTC(1)
    usersAPIMock.follow.mockReturnValue(Promise.resolve(result));

    
    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toHaveBeenCalledTimes(3)
    expect(dispatchMock).toHaveBeenCalledWith(1, actions.toggleFollowingInProgress(true, 1))
    expect(dispatchMock).toHaveBeenCalledWith(2, actions.followSuccsess(1))
    expect(dispatchMock).toHaveBeenCalledWith(3, actions.toggleFollowingInProgress(false, 1))
})