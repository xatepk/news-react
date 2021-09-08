import { Icon } from '@iconify/react';

export const SvgIcon = ({ icon = 'comment', ...restProps }) => <Icon icon={`mdi-light:${icon}`} { ...restProps } />;
