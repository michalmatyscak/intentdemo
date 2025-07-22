# GitHub Pages Deployment

This project is configured to deploy to GitHub Pages using GitHub Actions.

## Setup Instructions

1. **Enable GitHub Pages in your repository:**
   - Go to your repository settings
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"

2. **Push the workflow file:**
   - The `.github/workflows/deploy.yml` file will automatically trigger deployment
   - Every push to the `main` branch will trigger a new deployment

3. **Access your site:**
   - Your site will be available at: `https://michalmatyscak.github.io/intentdemo/`
   - The first deployment may take a few minutes to complete

## Configuration

- **Static Export**: The app is configured for static export (`output: 'export'`)
- **Trailing Slash**: Enabled for better GitHub Pages compatibility
- **Unoptimized Images**: Required for static export

## Manual Deployment

If you need to deploy manually:
1. Run `npm run build`
2. The static files will be generated in the `out/` directory
3. Upload the contents of `out/` to your GitHub Pages branch

## Troubleshooting

- Check the "Actions" tab in your repository for deployment status
- Ensure the repository has GitHub Pages enabled
- Verify that the workflow has the necessary permissions 