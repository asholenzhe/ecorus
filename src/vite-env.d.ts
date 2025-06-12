// src/env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
        readonly REACT_APP_API_URL?: string
        // сюда можно добавить другие свои env-переменные
    }
}

// И ещё раз объявляем сам процесс в глобальной области
var process: {
    env: NodeJS.ProcessEnv
}
