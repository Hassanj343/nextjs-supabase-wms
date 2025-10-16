# InventoryFlow

Modern inventory management system specifically designed for jewelry businesses. Built with Next.js 15, Supabase, and shadcn/ui.

## Features

- **Comprehensive Inventory Management**: Track products with detailed specifications, pricing, and profit calculations
- **Customer & Supplier Management**: Maintain relationships and transaction history
- **Sales Processing**: Process transactions with automatic inventory updates
- **Multi-Currency Support**: Handle both INR and GBP with exchange rate management
- **Analytics Dashboard**: Business insights and performance metrics
- **Barcode Integration**: Quick product identification and management
- **MCP Integration**: AI-powered insights and external data connectivity

## Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **Backend**: Supabase (Database, Authentication, Real-time)
- **Validation**: Zod schemas with React Hook Form
- **Styling**: Tailwind CSS with custom design system
- **Development**: ESLint, Prettier, TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd inventory-flow
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Fill in your Supabase credentials and other configuration values.

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
inventory-flow/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # Authentication routes
│   ├── (dashboard)/              # Protected dashboard routes
│   └── api/                      # API routes
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── forms/                    # Form components
│   ├── tables/                   # Data table components
│   └── charts/                   # Analytics components
├── lib/                          # Utility libraries
│   ├── supabase/                 # Supabase client configuration
│   └── validations/              # Zod validation schemas
├── server/                       # Server-side logic
│   ├── actions/                  # Server actions
│   └── queries/                  # Database queries
├── mcp/                          # MCP server configurations
├── supabase/                     # Database migrations and types
└── types/                        # TypeScript type definitions
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# MCP Configuration
MCP_SERVER_URL=your_mcp_server_url
MCP_API_KEY=your_mcp_api_key

# Application
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
