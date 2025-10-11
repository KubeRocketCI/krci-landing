---
dependencies:
  data: []
  templates: []
---

# Task: Work On Code

## Description

Implement, update, or refactor frontend code for the KubeRocketCI landing page. This task provides comprehensive guidance for working with Next.js, React components, TypeScript, and TailwindCSS following modern development patterns and project-specific conventions.

<instructions>
Identify target code component or feature. Ask user for specific file path, component name, or feature description. Confirm exact scope of work including implementation, update, or refactoring requirements before proceeding.

Analyze existing codebase patterns. Review current project structure, component patterns, TypeScript configurations, and TailwindCSS usage. Understand established conventions for file organization, naming, and coding standards.

Implement requested changes following project conventions. Apply Next.js App Router patterns, TypeScript strict mode, component composition with Radix UI, and TailwindCSS styling. Ensure accessibility, performance optimization, and code reusability in all implementations.

Validate code quality and functionality. Run project linting with Biome, verify TypeScript compilation, test component functionality, and ensure responsive design. Confirm code integrates properly with existing project structure and maintains established patterns.
</instructions>

## Framework Context: Frontend Development Patterns

Frontend Architecture: This project uses Next.js 15 with App Router, React 19, TypeScript 5, and TailwindCSS 4. The architecture emphasizes component reusability, type safety, and modern React patterns with server and client components.

Development Standards: Code follows TypeScript strict mode, Biome linting rules, component composition patterns, and accessibility best practices. Components use Radix UI primitives with custom styling via TailwindCSS and class-variance-authority for variant management.

Project Structure: Source code organized in `src/app` for pages, `src/components` for reusable components, and `src/lib` for utilities. Components follow clear separation of concerns with proper TypeScript interfaces and responsive design implementation.

## Essential Patterns

### TypeScript Best Practices

- Strict Typing: Replace `any` with proper interface definitions, especially for translation objects
- Component Props: Use `interface` for component props, `type` for unions and computed types
- Conditional Props: Implement function overloads for components with dependent props
- Key Props: Use stable, unique identifiers instead of array indices for React keys

### Next.js App Router Standards

- Server vs Client: Default to Server Components, use 'use client' only when needed for interactivity
- Image Optimization: Use `next/image` with proper `priority`, `loading`, and responsive sizing
- SEO Optimization: Include proper metadata, Open Graph tags, and structured data
- Performance: Implement proper loading states, error boundaries, and lazy loading

### TailwindCSS Patterns

- Responsive Design: Mobile-first approach with consistent breakpoint usage
- Utility Composition: Use `cn()` utility for conditional classes and variant management
- Accessibility: Include proper ARIA attributes, focus states, and semantic HTML
- Design System: Maintain consistent spacing, typography, and color schemes

## Output Format

- Code files: Proper file structure in `src/` following project conventions
- Component files: TypeScript React components with proper interfaces and exports
- Styling: TailwindCSS classes with responsive design and accessibility considerations
- Quality assurance: Code passes Biome linting and TypeScript compilation without errors

<success_criteria>

- Code implementation completed following Next.js and React best practices
- TypeScript compilation successful with no type errors
- Biome linting passes with no code quality issues
- Component functionality verified and responsive design confirmed
- Code integrates seamlessly with existing project structure
- Accessibility standards met and performance optimized
</success_criteria>

## Execution Checklist

### Analysis Phase

- Project structure reviewed and component patterns understood
- Target component or feature scope clearly defined
- Existing code patterns and conventions identified
- TypeScript configurations and styling approach confirmed

### Implementation Phase

- Code implemented following established project patterns
- TypeScript interfaces and types properly defined
- TailwindCSS styling applied with responsive design considerations
- Component composition and reusability principles followed
- Accessibility attributes and semantic HTML implemented

### Validation Phase

- TypeScript compilation successful without errors
- Biome linting passes with no code quality issues
- Component functionality tested and verified
- Responsive design confirmed across different screen sizes
- Code integration with existing project validated
- Performance optimization confirmed
