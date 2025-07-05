# GrowthProAI - Mini Local Business Dashboard

This project is a small-scale, full-stack application built to demonstrate a core use case of GrowthProAI: providing small businesses with simulated SEO and Google Business data insights.

## Objective

The application allows a user to enter a business name and location to receive a dashboard view containing:
- A simulated Google rating.
- A simulated number of reviews.
- An AI-generated SEO headline for their website.

Users can also regenerate the SEO headline on-demand.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components
- **AI/Generative**: [Google AI](https://ai.google/) via [Genkit](https://google.github.io/genkit/)
- **Language**: TypeScript

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later recommended)
- `npm` or `yarn` package manager

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/[YOUR_GITHUB_USERNAME]/[YOUR_REPO_NAME].git
    cd [YOUR_REPO_NAME]
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google AI API key:
    ```env
    GOOGLE_API_KEY=YOUR_API_KEY_HERE
    ```
    You can obtain a key from the [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Development Server

Once the installation is complete, you can start the local development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Core Features

- **Responsive Form**: A clean and simple form to input business details.
- **Dynamic Data Display**: A card component that populates with simulated and AI-generated data after submission.
- **AI Headline Generation**: Leverages a generative model to create unique SEO-friendly headlines.
- **On-Demand Regeneration**: A "Regenerate" button to fetch a new headline without re-submitting the form.
- **Loading & Error States**: The UI provides clear feedback to the user during data fetching and in case of an error.
