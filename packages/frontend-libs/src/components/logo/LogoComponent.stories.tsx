import type { Meta, Story } from '@storybook/react';
import { TLogo } from './TLogo';
import { TymlezLogo } from './TymlezLogo';

export default {
  title: 'components/Logo',
} as Meta;

//========================Logo===============================
const LogoTemplate: Story = (args) => <TymlezLogo {...args} />;

export const LogoPrimary = LogoTemplate.bind({});
LogoPrimary.args = {};
LogoPrimary.storyName = 'Logo';

//========================TLogo===============================
const TLogoTemplate: Story = (args) => <TLogo {...args} />;

export const TLogoPrimary = TLogoTemplate.bind({});
TLogoPrimary.args = {};
TLogoPrimary.storyName = 'TLogo';
