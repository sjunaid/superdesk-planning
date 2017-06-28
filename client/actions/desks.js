/**
 * Action dispatcher to load the list of users in Superdesk.
 * The data is fetched using the angular service `superdesk.apps.users.userListService`
 * @return arrow function
 */
const loadDesks = () => (
    (dispatch, getState, { desks }) => (
        desks.initialize().then(() => (
            dispatch({
                type: 'RECEIVE_DESKS',
                payload: desks.desks._items,
            })
        ))
    )
)

export {
    loadDesks,
}
