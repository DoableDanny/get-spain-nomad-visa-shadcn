# Spain Digital Nomad Visa Application Platform

A comprehensive Next.js application to help digital nomads apply for the Spain Digital Nomad Visa with expert lawyer assistance.

## Features Implemented

### Marketing Website (/)
- **Hero Section**: Clear value proposition with call-to-action buttons
- **Navigation**: Links to Blog and Login/Get Started buttons
- **Features Section**: 4 key benefits presented in card format
- **How It Works**: Step-by-step process overview
- **Booking Section**: Consultation booking form (UI only - integration pending)
- **Responsive Design**: Mobile-friendly layout using Tailwind CSS

### Visa Application Portal (/app)
A multi-step form application with comprehensive document management:

#### Step 1: Work Contract
- Requirements display (3 months old, Spain work permission, €3,000/month income)
- File upload with drag-and-drop
- Timeline for user and lawyer notes
- Auto-save on upload

#### Step 2: Company Certificate
- Requirements display (incorporation date, 1 year old company)
- File upload functionality
- Translation status checkbox
- Request translation button
- Timeline for notes and communication

#### Step 3: Degree/Proof of Expertise
- Radio button selection between:
  - Master's Degree Certificate (requires apostille + sworn translation)
  - Proof of Employment (3+ years with contracts and invoices)
- Dynamic requirements based on selection
- File upload with translation tracking
- Timeline for notes

#### Step 4: Criminal Record
- Requirements display (recent, apostilled, sworn translated)
- File upload functionality
- Translation status tracking
- Request translation button
- Timeline for notes

#### Step 5: Submit
- Application summary with completion status
- Validation ensuring all steps are complete
- Visual indicators for complete/incomplete steps
- Submit button (enabled only when all requirements met)

### Custom Components

#### Stepper Component
- Visual progress indicator across the top
- Status indicators:
  - Green checkmark: Completed
  - Yellow dot: Half-completed (uploaded but not translated)
  - Blue dot: Current step
  - Gray dot: Upcoming step
- Clickable steps for navigation

#### Timeline Component
- User notes (blue background)
- Lawyer notes (distinct styling)
- Timestamp for each entry
- Add note functionality
- Vertical timeline display with icons

#### File Upload Component
- Drag and drop support
- File size validation (configurable, default 10MB)
- File type filtering
- Upload progress indication
- Display uploaded file with metadata
- Remove file option

### Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (manually configured)
- **Icons**: lucide-react
- **State Management**: React hooks (useState)

## Still To Implement

### High Priority
1. **Authentication System** - NextAuth.js with Google OAuth + username/password
2. **Stripe Payment Integration** - €30 consultation payment
3. **Google Calendar Integration** - Multi-lawyer availability and booking
4. **Backend API & Database** - PostgreSQL/Prisma for data persistence
5. **File Storage** - AWS S3 or similar for document uploads

### Medium Priority
6. **Email Notifications** - Booking confirmations and status updates
7. **WhatsApp Integration** - Lawyer notifications via Twilio
8. **Translation Management** - Quote system and invoice generation
9. **Lawyer Dashboard** - Application review and management interface

### Lower Priority
10. **Blog System** - Content management for blog posts
11. **Enhanced Features** - PDF generation, document preview, reminders
12. **Analytics & Monitoring** - User tracking and error monitoring

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

The application will be available at:
- Marketing site: `http://localhost:3000`
- Blog: `http://localhost:3000/blog`
- Application portal: `http://localhost:3000/app`

## Project Structure

```
├── app/
│   ├── (application)/app/        # Multi-step visa application
│   ├── blog/                     # Blog section (placeholder)
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Marketing homepage
│   └── globals.css               # Global styles with theme
├── components/
│   ├── application/              # Application-specific components
│   └── ui/                       # shadcn/ui components
├── lib/
│   └── utils.ts                  # Utility functions
└── public/                       # Static assets
```

## Next Steps

1. Set up authentication (NextAuth.js)
2. Implement database schema
3. Add file storage (AWS S3)
4. Integrate Stripe payments
5. Connect Google Calendar API
6. Build API routes for data operations
7. Add email/WhatsApp notifications
8. Create lawyer dashboard
9. Comprehensive testing
10. Production deployment
