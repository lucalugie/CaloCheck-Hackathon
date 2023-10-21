export default function LoginFunction() {

const randomState = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

return {randomState}

}