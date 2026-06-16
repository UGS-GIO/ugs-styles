<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>hazards:hazards_displacement_contours_review</sld:Name>
        <sld:UserStyle>
            <sld:Name>energy_minerals_insar_displacement_contours_sld</sld:Name>
            <sld:Title>Red-White-Blue value_cm</sld:Title>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Title>&lt; -3.0</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsLessThan>
                            <ogc:PropertyName>value_cm</ogc:PropertyName>
                            <ogc:Literal>-3.0</ogc:Literal>
                        </ogc:PropertyIsLessThan>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#C00000</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>-3.0 to -2.8</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-3.0</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-2.8</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#C00000</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>-2.8 to -2.6</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-2.8</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-2.6</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#C41010</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>-2.6 to -2.4</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-2.6</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-2.4</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#C82121</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>-2.4 to -2.2</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-2.4</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-2.2</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#CD3131</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>-2.2 to -2.0</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-2.2</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-2.0</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#D14242</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>-2.0 to -1.8</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-2.0</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-1.8</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#D65252</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>-1.8 to -1.6</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-1.8</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-1.6</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#DA6363</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>-1.6 to -1.4</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-1.6</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-1.4</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#DF7474</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>-1.4 to -1.2</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-1.4</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-1.2</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#E38484</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>-1.2 to -1.0</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-1.2</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-1.0</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#E79595</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>-1.0 to -0.8</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-1.0</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-0.8</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#ECA5A5</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>-0.8 to -0.6</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-0.8</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-0.6</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#F0B6B6</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>-0.6 to -0.4</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-0.6</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-0.4</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#F5C6C6</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>-0.4 to -0.2</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-0.4</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-0.2</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#F9D7D7</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>-0.2 to 0.0</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-0.2</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>0.0</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#FEE8E8</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>~0</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>-0.1</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>0.1</ogc:Literal>
                            </ogc:PropertyIsLessThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>0.1 to 0.2</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>0.1</ogc:Literal>
                            </ogc:PropertyIsGreaterThan>
                            <ogc:PropertyIsLessThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>0.2</ogc:Literal>
                            </ogc:PropertyIsLessThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#F0F0FF</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>0.2 to 0.4</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>0.2</ogc:Literal>
                            </ogc:PropertyIsGreaterThan>
                            <ogc:PropertyIsLessThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>0.4</ogc:Literal>
                            </ogc:PropertyIsLessThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#DEDEFA</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>0.4 to 0.6</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>0.4</ogc:Literal>
                            </ogc:PropertyIsGreaterThan>
                            <ogc:PropertyIsLessThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>0.6</ogc:Literal>
                            </ogc:PropertyIsLessThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#CDCDF6</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>0.6 to 0.8</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>0.6</ogc:Literal>
                            </ogc:PropertyIsGreaterThan>
                            <ogc:PropertyIsLessThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>0.8</ogc:Literal>
                            </ogc:PropertyIsLessThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#BCBCF1</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>0.8 to 1.0</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>0.8</ogc:Literal>
                            </ogc:PropertyIsGreaterThan>
                            <ogc:PropertyIsLessThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>1.0</ogc:Literal>
                            </ogc:PropertyIsLessThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#ABABED</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>1.0 to 1.2</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>1.0</ogc:Literal>
                            </ogc:PropertyIsGreaterThan>
                            <ogc:PropertyIsLessThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>1.2</ogc:Literal>
                            </ogc:PropertyIsLessThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#9A9AE8</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>1.2 to 1.4</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>1.2</ogc:Literal>
                            </ogc:PropertyIsGreaterThan>
                            <ogc:PropertyIsLessThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>1.4</ogc:Literal>
                            </ogc:PropertyIsLessThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#8989E4</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>1.4 to 1.6</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>1.4</ogc:Literal>
                            </ogc:PropertyIsGreaterThan>
                            <ogc:PropertyIsLessThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>1.6</ogc:Literal>
                            </ogc:PropertyIsLessThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#7878DF</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>1.6 to 1.8</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>1.6</ogc:Literal>
                            </ogc:PropertyIsGreaterThan>
                            <ogc:PropertyIsLessThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>1.8</ogc:Literal>
                            </ogc:PropertyIsLessThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#6666DB</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>1.8 to 2.0</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>1.8</ogc:Literal>
                            </ogc:PropertyIsGreaterThan>
                            <ogc:PropertyIsLessThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>2.0</ogc:Literal>
                            </ogc:PropertyIsLessThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#5555D6</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>2.0 to 2.2</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>2.0</ogc:Literal>
                            </ogc:PropertyIsGreaterThan>
                            <ogc:PropertyIsLessThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>2.2</ogc:Literal>
                            </ogc:PropertyIsLessThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#4444D2</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>2.2 to 2.4</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>2.2</ogc:Literal>
                            </ogc:PropertyIsGreaterThan>
                            <ogc:PropertyIsLessThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>2.4</ogc:Literal>
                            </ogc:PropertyIsLessThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#3333CD</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>2.4 to 2.6</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>2.4</ogc:Literal>
                            </ogc:PropertyIsGreaterThan>
                            <ogc:PropertyIsLessThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>2.6</ogc:Literal>
                            </ogc:PropertyIsLessThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#2222C9</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>2.6 to 2.8</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>2.6</ogc:Literal>
                            </ogc:PropertyIsGreaterThan>
                            <ogc:PropertyIsLessThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>2.8</ogc:Literal>
                            </ogc:PropertyIsLessThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#1111C4</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>2.8 to 3.0</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThan>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>2.8</ogc:Literal>
                            </ogc:PropertyIsGreaterThan>
                            <ogc:PropertyIsLessThanOrEqualTo>
                                <ogc:PropertyName>value_cm</ogc:PropertyName>
                                <ogc:Literal>3.0</ogc:Literal>
                            </ogc:PropertyIsLessThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#0000C0</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Title>&gt; 3.0</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsGreaterThan>
                            <ogc:PropertyName>value_cm</ogc:PropertyName>
                            <ogc:Literal>3.0</ogc:Literal>
                        </ogc:PropertyIsGreaterThan>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#0000C0</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#cccccc</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.1</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

