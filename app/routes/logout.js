export function action({request}) {
    if (request.method !== ' POST') {
        throw json({ message: 'Invalid request method' }, { status: 400 });
    }

    return destroyUserSession(request);
}