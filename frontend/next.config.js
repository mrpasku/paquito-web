const nextConfig = {
    output: 'export',
    distDir: 'hostinger_deploy',
    trailingSlash: true,
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**',
            },
        ],
    },
}

module.exports = nextConfig
