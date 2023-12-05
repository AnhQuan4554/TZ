import { getIpfsContent } from './fetch';

jest.setTimeout(30000);
describe.skip('IPFS Fetch ', () => {
  it.each`
    cid                                                                                   | type         | gateway
    ${'bafkreidekezwm424jrmslefme66g4pozqyh64bx6lriir6i34fvvpeeldy'}                      | ${'json'}    | ${'ipfs.io'}
    ${'bafkreidekezwm424jrmslefme66g4pozqyh64bx6lriir6i34fvvpeeldy'}                      | ${'json'}    | ${'dweb.link'}
    ${'bafkreidekezwm424jrmslefme66g4pozqyh64bx6lriir6i34fvvpeeldy'}                      | ${'json'}    | ${'gateway.ipfs.io'}
    ${'bafkreidekezwm424jrmslefme66g4pozqyh64bx6lriir6i34fvvpeeldy'}                      | ${'text'}    | ${'ipfs.io'}
    ${'bafkreidekezwm424jrmslefme66g4pozqyh64bx6lriir6i34fvvpeeldy'}                      | ${'buffer'}  | ${'ipfs.io'}
    ${'bafkreidekezwm424jrmslefme66g4pozqyh64bx6lriir6i34fvvpeeldy'}                      | ${undefined} | ${undefined}
    ${'ipfs://bafkreidekezwm424jrmslefme66g4pozqyh64bx6lriir6i34fvvpeeldy'}               | ${undefined} | ${undefined}
    ${'https://ipfs.io/ipfs/bafkreidekezwm424jrmslefme66g4pozqyh64bx6lriir6i34fvvpeeldy'} | ${undefined} | ${undefined}
  `(
    'IPFS fetch should successful for provider $gateway and response type= $type, gateway = $gateway CID = $cid',
    async ({ cid, gateway, type }) => {
      const data: any = await getIpfsContent(cid, type, gateway);
      if (type === 'json') {
        expect(data).toEqual({ test: '1234' });
      }
      if (type === 'text') {
        expect(JSON.parse(data)).toEqual({ test: '1234' });
      }
      if (type === 'buffer') {
        expect(JSON.parse(data.toString())).toEqual({ test: '1234' });
      }
    },
  );
});
