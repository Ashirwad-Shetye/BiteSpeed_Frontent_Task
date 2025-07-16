# Chatbot Flow Builder

A modern web application for visually building chatbot conversation flows using a drag-and-drop interface. Built with Next.js, React, React Flow, and Tailwind CSS.

## Features

- **Visual Flow Builder:** Drag and drop nodes to design chatbot logic.
- **Custom Nodes:** Add and edit "Message" nodes representing chatbot messages.
- **Node Editing:** Click a node to edit its content in a settings panel.
- **Connections:** Connect nodes to define conversation paths.
- **Flow Validation:** Prevents invalid flows (e.g., multiple root nodes).
- **Reset & Save:** Easily reset or save your flow with validation feedback.
- **Modern UI:** Responsive design with Tailwind CSS and custom icons.

## Tech Stack

- [Next.js](https://nextjs.org/) (React framework)
- [React Flow](https://reactflow.dev/) (flow diagrams)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS)
- [TypeScript](https://www.typescriptlang.org/) (type safety)
- [Sonner](https://sonner.emilkowal.ski/) (toast notifications)
- [React Icons](https://react-icons.github.io/react-icons/)

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- A package manager: npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd chatbot-flow-builder
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser:**

   Visit [http://localhost:3000](http://localhost:3000)

## Usage

1. **Add Nodes:** Drag a "Message" node from the right panel onto the canvas.
2. **Edit Nodes:** Click a node to edit its message in the settings panel.
3. **Connect Nodes:** Drag from the source handle to another node's target handle to create a connection.
4. **Save Flow:** Click "Save Changes" to validate and save your flow.
5. **Reset Flow:** Use the "Reset" button to clear the canvas.

## Project Structure

- `src/app/` - Next.js app directory (entry point, layout, global styles)
- `src/components/flowBuilder/` - Main FlowBuilder component
- `src/components/nodes/` - Custom node types (e.g., TextNode)
- `src/components/` - UI panels and icons
- `src/types/` - TypeScript types for nodes and edges
- `src/utils/` - Flow validation logic

## Configuration

- **Styling:** Uses Tailwind CSS (see `src/app/globals.css` and `postcss.config.mjs`)
- **TypeScript:** Configured via `tsconfig.json`
- **ESLint:** Linting rules in `eslint.config.mjs`
- **Next.js:** Custom config in `next.config.ts`

## Deployment

- Deploy on [Vercel](https://vercel.com/) or any platform supporting Next.js standalone output.
- Build for production:

  ```bash
  npm run build
  npm start
  ```
