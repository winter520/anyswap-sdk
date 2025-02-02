import invariant from 'tiny-invariant'
import { ChainId } from '../constants'
import { validateAndParseAddress } from '../utils'
import { Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string

  public constructor(
    chainId: ChainId,
    address: string,
    decimals: number,
    symbol?: string,
    name?: string,
    underlying?: any,

    ContractVersion?: any,
    destChains?: any,
    logoUrl?: any,
    price?: any,
    tokenid?: any,
    version?: any,
    routerToken?: any,
  ) {
    super(
      decimals,
      symbol,
      name,
      underlying,
      chainId,
      ContractVersion,
      destChains,
      logoUrl,
      price,
      tokenid,
      version,
      routerToken,
    )
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    // console.log(other)
    // console.log(this)
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

export const WETH = {
  [ChainId.MAINNET]: new Token( ChainId.MAINNET, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped Ether' ),
  [ChainId.ROPSTEN]: new Token( ChainId.ROPSTEN, '0xc778417E063141139Fce010982780140Aa0cD5Ab', 18, 'WETH', 'Wrapped Ether' ),
  [ChainId.RINKEBY]: new Token( ChainId.RINKEBY, '0xe41c4939D2CB35A4DD61e852e2aa00D493AF87A3', 18, 'WETH', 'Wrapped Ether' ),
  [ChainId.GÖRLI]: new Token( ChainId.GÖRLI, '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.KOVAN]: new Token( ChainId.KOVAN, '0xd0A1E359811322d97991E03f863a0C30C2cF029C', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.HTTEST]: new Token( ChainId.HTTEST, '0xa5a3c93776ba2e1a78c79e88a2cb5abab2a0097f', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.HTMAIN]: new Token( ChainId.HTMAIN, '0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.BNBMAIN]: new Token( ChainId.BNBMAIN, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.BNBTEST]: new Token( ChainId.BNBTEST, '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.MATICMAIN]: new Token( ChainId.MATICMAIN, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.XDAIMAIN]: new Token( ChainId.XDAIMAIN, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.FTMMAIN]: new Token( ChainId.FTMMAIN, '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.OKEX]: new Token( ChainId.OKEX, '0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.HARMONY]: new Token( ChainId.HARMONY, '0x6983D1E6DEf3690C4d616b13597A09e6193EA013', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.AVALANCHE]: new Token( ChainId.AVALANCHE, '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15', 18, 'WETH', 'Wrapped Ether'),
}
