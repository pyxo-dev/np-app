import { html, TemplateResult } from 'lit';
import '../src/np-app.js';

export default {
  title: 'NpApp',
  component: 'np-app',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  title?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({
  title,
  backgroundColor = 'white',
}: ArgTypes) => html`
  <np-app
    style="--np-app-background-color: ${backgroundColor}"
    .title=${title}
  ></np-app>
`;

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
