import type {ReactNode} from 'react';
import AltoFooter from '../../components/AltoFooter';

/**
 * Swizzled @theme/Footer — every page (docs, blog, custom) renders the same
 * AltoFooter so the bottom of the site is consistent.
 */
export default function Footer(): ReactNode {
  return <AltoFooter />;
}
