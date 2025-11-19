import { Children, isValidElement } from 'react';

/**
 * Recursively searches through React children to find elements of a specific component type.
 * @param children - The React children to search through
 * @param target - The component type to search for
 * @returns Array of matching React elements
 */
export function getChildrenByComponentName<T extends React.ElementType>(
  children: React.ReactNode,
  target: T
): React.ReactElement<React.ComponentProps<T>>[] {
  const results: React.ReactElement<React.ComponentProps<T>>[] = [];

  // Type guard to check if a React element matches the target component
  const isTargetElement = (
    element: React.ReactElement
  ): element is React.ReactElement<React.ComponentProps<T>> => {
    return element.type === target;
  };

  const searchRecursively = (nodes: React.ReactNode): void => {
    for (const child of Children.toArray(nodes)) {
      if (!isValidElement(child)) {
        return;
      }

      if (isTargetElement(child)) {
        results.push(child);
      }

      const element = child as React.ReactElement<React.ComponentProps<T>>;

      // Recursively search through children if they exist
      if (element.props?.children) {
        searchRecursively(element.props.children);
      }
    }
  };

  searchRecursively(children);

  return results;
}
