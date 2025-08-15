# SkillPopper Component

A React component that provides contextual information about skills through an interactive popper tooltip.

## Features

- **Interactive Tooltips**: Click on skills to see detailed, non-technical explanations
- **Responsive Design**: Automatically adjusts placement to stay within viewport bounds
- **Visual Feedback**: Hover effects and smooth animations
- **Accessibility**: Proper click-away handling and keyboard navigation
- **Styled Integration**: Matches the project's design system with Material-UI

## Usage

```jsx
import SkillPopper from './SubComponents/SkillPopper';

// Wrap any skill element with the SkillPopper
<SkillPopper skill="React.js" definition="A popular library for building...">
  <Chip label="React.js" />
</SkillPopper>
```

## Props

- `skill` (string): The name of the skill being described
- `definition` (string): A user-friendly explanation of what the skill is used for
- `children` (ReactNode): The element to wrap (usually a Chip or similar component)

## Design Philosophy

The component is designed to help non-technical users understand technical skills by providing:

1. **Context-aware explanations**: Definitions focus on practical applications rather than technical details
2. **Unobtrusive interaction**: Info icons appear on hover, poppers activate on click
3. **Professional appearance**: Matches the CV's existing design language

## Styling

The component uses:
- Material-UI's Popper and Paper components for positioning and appearance
- CSS classes from cv.css for consistent styling
- Smooth transitions and hover effects for better UX
