import SimpleMDE from 'react-simplemde-editor'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Editor({ content, setContent }): JSX.Element {
  return <SimpleMDE value={content} onChange={setContent} />
}
