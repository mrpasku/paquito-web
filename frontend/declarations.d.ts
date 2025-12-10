// Mocks for missing dependencies to silence IDE errors
declare module 'next/link' {
    const Link: any;
    export default Link;
}

declare module 'next/script' {
    const Script: any;
    export default Script;
}

declare module 'next/font/google' {
    export const Inter: any;
}

declare module 'react' {
    export const useState: any;
    export const useEffect: any;
    export type ReactNode = any;
    const React: any;
    export default React;
}

declare module 'react-dom' {
    const ReactDOM: any;
    export default ReactDOM;
}

declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}

declare module 'lucide-react' {
    export const ShoppingBag: any;
    export const BookOpen: any;
    export const Star: any;
    // Add other icons as needed
}

declare const process: {
    env: {
        [key: string]: string | undefined;
    }
};
