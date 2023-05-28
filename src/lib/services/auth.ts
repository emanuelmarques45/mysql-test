type SignInResponse = {
  token: string
  user: User
}

export async function signInRequest(data: SignInData) {
  const {
    token,
    user: { id, name, username, email, avatar },
  }: SignInResponse = await fetch(`/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.encryptedPassword,
    }),
  }).then((data) => data.json())

  return {
    token,
    user: {
      id,
      name,
      username,
      email,
      avatar,
    },
  }
}
