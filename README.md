# Visual - Interactive Music Reactive Sketches

A modern web platform for creating and sharing interactive, music-reactive creative coding sketches. Built with Next.js, TypeScript, and Three.js, this platform allows DJs, VJs, and creative coders to create and share their audio-visual experiences.

## Features

- 🎵 Real-time audio visualization
- 🎨 Support for Three.js, canvas-sketch, and Hydra.js sketches
- 🎛️ Interactive parameter controls
- 🎧 Audio input support
- 🌙 Sleek dark-themed UI
- 📱 Responsive design
- 🔄 Real-time updates
- 🎮 Fullscreen mode
- 🎨 Customizable visualizations

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Three.js](https://threejs.org/) - 3D graphics
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) - Audio processing

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- A modern web browser

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/visual-website.git
   cd visual-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Project Structure

```
visual-website/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── components/   # Reusable components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── sketches/     # Creative coding sketches
│   │   └── styles/       # Global styles
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
└── package.json          # Project dependencies
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Contributing

We welcome contributions from the community! Here's how you can help:

1. Fork the repository
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Run the linter and type checker:
   ```bash
   npm run lint
   npm run type-check
   ```
5. Commit your changes with a descriptive message
6. Push to your fork and create a pull request

### Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Keep pull requests focused and small

### Creating a New Sketch

1. Create a new file in `src/app/sketches/` with your sketch name
2. Implement your sketch using Three.js, canvas-sketch, or Hydra.js
3. Add proper cleanup and error handling
4. Add controls using the provided UI components
5. Test your sketch with different audio inputs

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Three.js](https://threejs.org/) for 3D graphics
- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- The creative coding community for inspiration

## Support

If you have any questions or need help, please open an issue in the repository.
