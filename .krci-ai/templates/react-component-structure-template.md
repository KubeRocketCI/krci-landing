# React Component & Next.js Page Structure Template

<instructions>
TEMPLATE PURPOSE: This template provides standardized folder structures for React components and Next.js pages with proper organization for hooks, utilities, styling, testing, and type definitions. Use this template to create consistent component and page architectures that support maintainability, testability, and scalability.

VARIABLE SYSTEM: This template uses {{variable_name}} placeholders for dynamic content. All variables should be populated with specific component details during template usage.

XML GUIDANCE: The <instructions> tags provide guidance for LLM processing and should never appear in the final output. These tags help structure the component creation process.
</instructions>

## Structure Overview

<instructions>
Provide a high-level overview of both component and page structures. This section should explain the organizational principles and how different folders serve specific purposes in both component and page architectures.
</instructions>

### React Component Structure

<instructions>
Explain the component structure organization principles and how different folders serve specific purposes in the component architecture.
</instructions>

{{component_name}}/
├── index.tsx # Root component file with markup and simple props interface
├── hooks/ # Custom hooks folder (if component has internal hooks)
│ ├── {{simple_hook_name}}.ts # Simple hook implementation
│ └── {{complex_hook_folder}}/ # Complex hook with unit tests
│ ├── index.ts # Complex hook implementation
│ └── index.test.ts # Unit tests for complex hook
├── utils/ # Utility functions folder (if component has internal utilities)
│ ├── {{simple_util_name}}.ts # Simple utility function
│ └── {{complex_util_folder}}/ # Complex utility with unit tests
│ ├── index.ts # Complex utility implementation
│ └── index.test.ts # Unit tests for complex utility
├── module.css # CSS modules (if styling is more complex than Tailwind)
├── index.test.tsx # Snapshot test for component
├── constants.ts # Component-related constants
└── types.ts # TypeScript types (if complex props or shared types)

### Next.js Page Structure

<instructions>
Explain the Next.js page structure organization principles, including file-based routing and component organization strategies for pages with internal vs shared components.
</instructions>

**Page Location:** `src/app/{{page_route}}/`

{{page_route}}/
├── page.tsx # Next.js page component (file-based routing)
├── layout.tsx # Page-specific layout (optional)
├── loading.tsx # Loading UI (optional)
├── error.tsx # Error UI (optional)
├── not-found.tsx # Not found UI (optional)
├── components/ # Internal page components (not used elsewhere)
│ ├── {{internal_component}}/ # Internal component following component structure
│ └── {{another_internal}}/ # Another internal component
├── hooks/ # Page-specific hooks (if page has internal hooks)
│ ├── {{simple_hook_name}}.ts # Simple hook implementation
│ └── {{complex_hook_folder}}/ # Complex hook with unit tests
│ ├── index.ts # Complex hook implementation
│ └── index.test.ts # Unit tests for complex hook
├── utils/ # Page-specific utilities (if page has internal utilities)
│ ├── {{simple_util_name}}.ts # Simple utility function
│ └── {{complex_util_folder}}/ # Complex utility with unit tests
│ ├── index.ts # Complex utility implementation
│ └── index.test.ts # Unit tests for complex utility
├── module.css # Page-specific styling (if needed)
├── page.test.tsx # Page component tests
├── constants.ts # Page-related constants
└── types.ts # Page-specific types (if complex props or shared types)

**Shared Components Location:** `src/components/`

- Components used in multiple pages or across the application
- Follow the same structure as individual components
- Organized by feature or functionality

## File Structure Details

### Next.js Page Files

<instructions>
Explain the purpose and structure of Next.js page files, including file-based routing conventions and when to use different page files.
</instructions>

**File: `page.tsx`**

- Main page component for the route
- Exported as default export
- Handles page-specific logic and data fetching
- Can include simple props interface or use external types

**File: `layout.tsx` (Optional)**

- Page-specific layout wrapper
- Used when page needs different layout than root layout
- Wraps the page component with additional UI elements

**File: `loading.tsx` (Optional)**

- Loading UI shown while page is loading
- Automatically displayed during navigation
- Replaces page content during loading states

**File: `error.tsx` (Optional)**

- Error UI for page-level errors
- Catches errors in page component and children
- Provides fallback UI for error states

**File: `not-found.tsx` (Optional)**

- Custom 404 page for this route
- Shown when route doesn't match any pages
- Overrides default Next.js 404 page

### Component Organization Strategy

<instructions>
Explain the strategy for organizing components between page-specific and shared locations, including decision criteria and best practices.
</instructions>

**Internal Page Components: `components/` folder within page**

- Components used only within this specific page
- Not shared with other pages or routes
- Follow the same structure as individual components
- Example: `UserProfileForm`, `ProductGallery`, `CheckoutSteps`

**Shared Components: `src/components/`**

- Components used across multiple pages
- Reusable across the entire application
- Organized by feature or functionality
- Example: `Button`, `Modal`, `Header`, `Footer`

**Decision Criteria:**

- **Internal**: Component is tightly coupled to page logic
- **Internal**: Component is unlikely to be reused elsewhere
- **Shared**: Component has generic functionality
- **Shared**: Component is used in multiple locations

### Root Component File

<instructions>
Explain the purpose and structure of the main index.tsx file. Include guidance on when to use simple props interfaces vs external types file.
</instructions>

**File: `index.tsx`**

- Contains the main component implementation
- Includes simple props interface directly in the file (before component declaration)
- Exports the component as default export
- Handles component markup and basic logic

**Simple Props Interface Pattern:**

```typescript
interface {{ComponentName}}Props {
  {{prop_name}}: {{prop_type}};
  {{optional_prop}}?: {{optional_type}};
}

const {{ComponentName}} = ({ {{prop_name}}, {{optional_prop}} }: {{ComponentName}}Props) => {
  // Component implementation
};
```

### Hooks Organization

<instructions>
Provide detailed guidance on when and how to organize custom hooks within the component structure. Explain the difference between simple and complex hooks and their respective organizational patterns.
</instructions>

**Simple Hooks: `hooks/{{hook_name}}.ts`**

- Single file implementation
- Used for straightforward custom logic
- No additional testing required beyond component tests
- Example: `useLocalStorage`, `useToggle`, `useDebounce`

**Complex Hooks: `hooks/{{hook_folder}}/`**

- Folder structure with separate files
- Used for hooks requiring unit testing
- Contains implementation and test files
- Example: `useApiData/index.ts` + `useApiData/index.test.ts`

### Utilities Organization

<instructions>
Explain the utility function organization pattern, distinguishing between simple utilities that can be inline and complex utilities that require separate testing and organization.
</instructions>

**Simple Utilities: `utils/{{util_name}}.ts`**

- Single file implementation
- Pure functions with no side effects
- Used for data transformation, formatting, calculations
- Example: `formatDate.ts`, `validateEmail.ts`

**Complex Utilities: `utils/{{util_folder}}/`**

- Folder structure with implementation and tests
- Used for utilities requiring unit testing
- Contains business logic or complex algorithms
- Example: `dataProcessor/index.ts` + `dataProcessor/index.test.ts`

### Styling Strategy

<instructions>
Provide guidance on when to use CSS modules vs Tailwind classes, and how to organize styling within the component structure.
</instructions>

**CSS Modules: `module.css`**

- Use when styling is more complex than Tailwind can handle
- Required for complex styling combinations
- Provides component-scoped styling
- Alternative to inline styles for complex layouts

**Tailwind Classes:**

- Preferred for simple styling needs
- Use for standard spacing, colors, typography
- Keep component markup clean and readable

### Testing Structure

<instructions>
Explain the testing approach for different parts of the component structure, including snapshot tests, unit tests, and integration testing considerations.
</instructions>

**Component Testing: `index.test.tsx`**

- Snapshot testing for component rendering
- Props validation testing
- User interaction testing
- Integration testing with hooks and utilities

**Hook Testing: `hooks/{{complex_hook}}/index.test.ts`**

- Unit tests for complex custom hooks
- Test hook behavior in isolation
- Mock external dependencies
- Test edge cases and error conditions

**Utility Testing: `utils/{{complex_util}}/index.test.ts`**

- Unit tests for complex utility functions
- Test pure function behavior
- Test various input scenarios
- Ensure consistent output

### Constants Organization

<instructions>
Explain the purpose and organization of constants.ts file, including what types of constants should be included and how to structure them effectively.
</instructions>

**File: `constants.ts`**

- Contains component or page-related constants
- Exports named constants for reuse across the component/page
- Includes configuration values, default settings, and static data
- Organizes constants by category or functionality

**Constants Categories:**

- **Configuration**: Default values, settings, options
- **Static Data**: Fixed content, labels, messages
- **Dimensions**: Sizes, breakpoints, spacing values
- **API Endpoints**: URLs, query parameters, headers
- **Validation Rules**: Regex patterns, limits, constraints

**Example Structure:**

```typescript
// Configuration constants
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_RETRY_ATTEMPTS = 3;

// Static data constants
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
} as const;

// Dimension constants
export const BREAKPOINTS = {
  MOBILE: "768px",
  TABLET: "1024px",
  DESKTOP: "1200px",
} as const;
```

### Type Definitions

<instructions>
Provide guidance on when to create a separate types.ts file vs keeping types inline with the component. Explain the decision criteria for type organization.
</instructions>

**Separate Types File: `types.ts`**

- Use when component has complex props interface
- Required for shared types used elsewhere
- Contains interfaces, types, and enums
- Exports types for external consumption

**Inline Types:**

- Use for simple props interfaces
- Keep types close to component implementation
- Suitable for component-specific types
- Reduces file complexity for simple components

## Implementation Guidelines

<instructions>
Provide comprehensive implementation guidance covering best practices, naming conventions, file organization principles, and quality standards for React component development.
</instructions>

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile`, `DataTable`)
- **Files**: kebab-case (e.g., `user-profile.tsx`, `data-table.module.css`)
- **Hooks**: camelCase starting with "use" (e.g., `useUserData`, `useApiCall`)
- **Utilities**: camelCase (e.g., `formatDate`, `validateInput`)
- **Types**: PascalCase (e.g., `UserProfileProps`, `ApiResponse`)

### File Organization Principles

- **Single Responsibility**: Each file has one clear purpose
- **Logical Grouping**: Related functionality grouped together
- **Scalability**: Structure supports component growth
- **Maintainability**: Easy to locate and modify specific functionality
- **Testability**: Clear separation enables effective testing

### Quality Standards

- **Type Safety**: Comprehensive TypeScript usage
- **Testing Coverage**: Appropriate test coverage for complexity level
- **Code Clarity**: Clear, readable, and well-documented code
- **Performance**: Efficient implementation and minimal re-renders
- **Accessibility**: WCAG compliance and semantic HTML

## Usage Examples

<instructions>
Provide concrete examples of how to apply this template structure for different types of React components and Next.js pages, from simple to complex implementations.
</instructions>

### Simple Component Example

**Button Component Structure:**

```
Button/
├── index.tsx           # Simple button with props
├── index.test.tsx      # Snapshot test
├── constants.ts        # Button variants, sizes, colors
└── module.css          # Custom styling
```

### Complex Component Example

**DataTable Component Structure:**

```
DataTable/
├── index.tsx                    # Main component
├── hooks/
│   ├── useSorting.ts           # Simple sorting hook
│   └── usePagination/          # Complex pagination hook
│       ├── index.ts
│       └── index.test.ts
├── utils/
│   ├── formatCellValue.ts      # Simple formatting utility
│   └── dataProcessor/          # Complex data processing
│       ├── index.ts
│       └── index.test.ts
├── module.css                  # Complex table styling
├── index.test.tsx              # Component tests
├── constants.ts                # Table configuration, pagination settings
└── types.ts                    # Complex props and shared types
```

### Next.js Page Examples

**Simple Page Example:**

**User Profile Page Structure:**

```
src/app/profile/
├── page.tsx                    # Main profile page
├── loading.tsx                 # Loading state
├── error.tsx                   # Error handling
├── components/                 # Internal page components
│   ├── ProfileForm/            # Internal form component
│   │   ├── index.tsx
│   │   ├── module.css
│   │   └── index.test.tsx
│   └── AvatarUpload/           # Internal upload component
│       ├── index.tsx
│       ├── hooks/
│       │   └── useImageUpload.ts
│       └── index.test.tsx
├── hooks/                      # Page-specific hooks
│   └── useUserProfile.ts       # Profile data management
├── utils/                      # Page-specific utilities
│   └── profileValidation.ts    # Form validation logic
├── module.css                  # Page-specific styling
├── constants.ts                # Page configuration, form validation rules
└── types.ts                    # Page-specific types
```

**Complex Page Example:**

**E-commerce Product Page Structure:**

```
src/app/products/[id]/
├── page.tsx                    # Product page with dynamic routing
├── layout.tsx                  # Product page layout
├── loading.tsx                 # Product loading state
├── error.tsx                   # Product error handling
├── not-found.tsx              # Product not found
├── components/                 # Internal page components
│   ├── ProductGallery/         # Image gallery component
│   │   ├── index.tsx
│   │   ├── hooks/
│   │   │   └── useImageNavigation/
│   │   │       ├── index.ts
│   │   │       └── index.test.ts
│   │   ├── module.css
│   │   └── index.test.tsx
│   ├── ProductDetails/         # Product information
│   │   ├── index.tsx
│   │   ├── utils/
│   │   │   └── formatPrice.ts
│   │   └── index.test.tsx
│   └── AddToCart/              # Cart functionality
│       ├── index.tsx
│       ├── hooks/
│       │   └── useCartActions/
│       │       ├── index.ts
│       │       └── index.test.ts
│       └── index.test.tsx
├── hooks/                      # Page-specific hooks
│   ├── useProductData.ts       # Product data fetching
│   └── useProductReviews/      # Reviews management
│       ├── index.ts
│       └── index.test.ts
├── utils/                      # Page-specific utilities
│   ├── productCalculations.ts  # Price calculations
│   └── reviewHelpers/          # Review processing
│       ├── index.ts
│       └── index.test.ts
├── module.css                  # Page-specific styling
├── constants.ts                # Product page configuration, API endpoints
└── types.ts                    # Product page types
```

**Shared Components (used across pages):**

```
src/components/
├── Button/                     # Reusable button component
├── Modal/                      # Reusable modal component
├── Header/                     # Site header
├── Footer/                     # Site footer
└── ProductCard/                # Product card for listings
```

<instructions>
TEMPLATE VALIDATION CHECKLIST:

- [ ] All variables use {{variable_name}} format consistently
- [ ] Variable names are descriptive and follow naming conventions
- [ ] <instructions> tags provide clear guidance for LLM processing
- [ ] Template structure supports React component and Next.js page organization
- [ ] Content organization is logical and accessible
- [ ] Template design enables reusability across different component types
- [ ] Implementation guidelines are comprehensive and actionable
- [ ] Examples demonstrate proper usage patterns

CRITICAL REMINDERS:

- XML tags (<instructions>) are for LLM guidance ONLY - never in final output
- Variables must be populated during template usage
- Template structure should facilitate consistent component architecture
- Design templates for use across multiple React component and Next.js page types
- Follow React and TypeScript best practices
- Ensure template supports both simple and complex component needs
  </instructions>
