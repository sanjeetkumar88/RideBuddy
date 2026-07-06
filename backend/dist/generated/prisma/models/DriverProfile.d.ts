import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type DriverProfileModel = runtime.Types.Result.DefaultSelection<Prisma.$DriverProfilePayload>;
export type AggregateDriverProfile = {
    _count: DriverProfileCountAggregateOutputType | null;
    _min: DriverProfileMinAggregateOutputType | null;
    _max: DriverProfileMaxAggregateOutputType | null;
};
export type DriverProfileMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    vehicleModel: string | null;
    vehiclePlate: string | null;
    vehicleColor: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DriverProfileMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    vehicleModel: string | null;
    vehiclePlate: string | null;
    vehicleColor: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DriverProfileCountAggregateOutputType = {
    id: number;
    userId: number;
    vehicleModel: number;
    vehiclePlate: number;
    vehicleColor: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type DriverProfileMinAggregateInputType = {
    id?: true;
    userId?: true;
    vehicleModel?: true;
    vehiclePlate?: true;
    vehicleColor?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DriverProfileMaxAggregateInputType = {
    id?: true;
    userId?: true;
    vehicleModel?: true;
    vehiclePlate?: true;
    vehicleColor?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DriverProfileCountAggregateInputType = {
    id?: true;
    userId?: true;
    vehicleModel?: true;
    vehiclePlate?: true;
    vehicleColor?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type DriverProfileAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DriverProfileWhereInput;
    orderBy?: Prisma.DriverProfileOrderByWithRelationInput | Prisma.DriverProfileOrderByWithRelationInput[];
    cursor?: Prisma.DriverProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DriverProfileCountAggregateInputType;
    _min?: DriverProfileMinAggregateInputType;
    _max?: DriverProfileMaxAggregateInputType;
};
export type GetDriverProfileAggregateType<T extends DriverProfileAggregateArgs> = {
    [P in keyof T & keyof AggregateDriverProfile]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDriverProfile[P]> : Prisma.GetScalarType<T[P], AggregateDriverProfile[P]>;
};
export type DriverProfileGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DriverProfileWhereInput;
    orderBy?: Prisma.DriverProfileOrderByWithAggregationInput | Prisma.DriverProfileOrderByWithAggregationInput[];
    by: Prisma.DriverProfileScalarFieldEnum[] | Prisma.DriverProfileScalarFieldEnum;
    having?: Prisma.DriverProfileScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DriverProfileCountAggregateInputType | true;
    _min?: DriverProfileMinAggregateInputType;
    _max?: DriverProfileMaxAggregateInputType;
};
export type DriverProfileGroupByOutputType = {
    id: string;
    userId: string;
    vehicleModel: string;
    vehiclePlate: string;
    vehicleColor: string;
    createdAt: Date;
    updatedAt: Date;
    _count: DriverProfileCountAggregateOutputType | null;
    _min: DriverProfileMinAggregateOutputType | null;
    _max: DriverProfileMaxAggregateOutputType | null;
};
export type GetDriverProfileGroupByPayload<T extends DriverProfileGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DriverProfileGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DriverProfileGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DriverProfileGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DriverProfileGroupByOutputType[P]>;
}>>;
export type DriverProfileWhereInput = {
    AND?: Prisma.DriverProfileWhereInput | Prisma.DriverProfileWhereInput[];
    OR?: Prisma.DriverProfileWhereInput[];
    NOT?: Prisma.DriverProfileWhereInput | Prisma.DriverProfileWhereInput[];
    id?: Prisma.StringFilter<"DriverProfile"> | string;
    userId?: Prisma.StringFilter<"DriverProfile"> | string;
    vehicleModel?: Prisma.StringFilter<"DriverProfile"> | string;
    vehiclePlate?: Prisma.StringFilter<"DriverProfile"> | string;
    vehicleColor?: Prisma.StringFilter<"DriverProfile"> | string;
    createdAt?: Prisma.DateTimeFilter<"DriverProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DriverProfile"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type DriverProfileOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    vehicleModel?: Prisma.SortOrder;
    vehiclePlate?: Prisma.SortOrder;
    vehicleColor?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type DriverProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.DriverProfileWhereInput | Prisma.DriverProfileWhereInput[];
    OR?: Prisma.DriverProfileWhereInput[];
    NOT?: Prisma.DriverProfileWhereInput | Prisma.DriverProfileWhereInput[];
    vehicleModel?: Prisma.StringFilter<"DriverProfile"> | string;
    vehiclePlate?: Prisma.StringFilter<"DriverProfile"> | string;
    vehicleColor?: Prisma.StringFilter<"DriverProfile"> | string;
    createdAt?: Prisma.DateTimeFilter<"DriverProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DriverProfile"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type DriverProfileOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    vehicleModel?: Prisma.SortOrder;
    vehiclePlate?: Prisma.SortOrder;
    vehicleColor?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.DriverProfileCountOrderByAggregateInput;
    _max?: Prisma.DriverProfileMaxOrderByAggregateInput;
    _min?: Prisma.DriverProfileMinOrderByAggregateInput;
};
export type DriverProfileScalarWhereWithAggregatesInput = {
    AND?: Prisma.DriverProfileScalarWhereWithAggregatesInput | Prisma.DriverProfileScalarWhereWithAggregatesInput[];
    OR?: Prisma.DriverProfileScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DriverProfileScalarWhereWithAggregatesInput | Prisma.DriverProfileScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"DriverProfile"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"DriverProfile"> | string;
    vehicleModel?: Prisma.StringWithAggregatesFilter<"DriverProfile"> | string;
    vehiclePlate?: Prisma.StringWithAggregatesFilter<"DriverProfile"> | string;
    vehicleColor?: Prisma.StringWithAggregatesFilter<"DriverProfile"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DriverProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"DriverProfile"> | Date | string;
};
export type DriverProfileCreateInput = {
    id?: string;
    vehicleModel: string;
    vehiclePlate: string;
    vehicleColor: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutDriverProfileInput;
};
export type DriverProfileUncheckedCreateInput = {
    id?: string;
    userId: string;
    vehicleModel: string;
    vehiclePlate: string;
    vehicleColor: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DriverProfileUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleModel?: Prisma.StringFieldUpdateOperationsInput | string;
    vehiclePlate?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleColor?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutDriverProfileNestedInput;
};
export type DriverProfileUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleModel?: Prisma.StringFieldUpdateOperationsInput | string;
    vehiclePlate?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleColor?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DriverProfileCreateManyInput = {
    id?: string;
    userId: string;
    vehicleModel: string;
    vehiclePlate: string;
    vehicleColor: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DriverProfileUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleModel?: Prisma.StringFieldUpdateOperationsInput | string;
    vehiclePlate?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleColor?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DriverProfileUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleModel?: Prisma.StringFieldUpdateOperationsInput | string;
    vehiclePlate?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleColor?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DriverProfileNullableScalarRelationFilter = {
    is?: Prisma.DriverProfileWhereInput | null;
    isNot?: Prisma.DriverProfileWhereInput | null;
};
export type DriverProfileCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    vehicleModel?: Prisma.SortOrder;
    vehiclePlate?: Prisma.SortOrder;
    vehicleColor?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DriverProfileMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    vehicleModel?: Prisma.SortOrder;
    vehiclePlate?: Prisma.SortOrder;
    vehicleColor?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DriverProfileMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    vehicleModel?: Prisma.SortOrder;
    vehiclePlate?: Prisma.SortOrder;
    vehicleColor?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DriverProfileCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DriverProfileCreateWithoutUserInput, Prisma.DriverProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.DriverProfileCreateOrConnectWithoutUserInput;
    connect?: Prisma.DriverProfileWhereUniqueInput;
};
export type DriverProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DriverProfileCreateWithoutUserInput, Prisma.DriverProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.DriverProfileCreateOrConnectWithoutUserInput;
    connect?: Prisma.DriverProfileWhereUniqueInput;
};
export type DriverProfileUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DriverProfileCreateWithoutUserInput, Prisma.DriverProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.DriverProfileCreateOrConnectWithoutUserInput;
    upsert?: Prisma.DriverProfileUpsertWithoutUserInput;
    disconnect?: Prisma.DriverProfileWhereInput | boolean;
    delete?: Prisma.DriverProfileWhereInput | boolean;
    connect?: Prisma.DriverProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DriverProfileUpdateToOneWithWhereWithoutUserInput, Prisma.DriverProfileUpdateWithoutUserInput>, Prisma.DriverProfileUncheckedUpdateWithoutUserInput>;
};
export type DriverProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DriverProfileCreateWithoutUserInput, Prisma.DriverProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.DriverProfileCreateOrConnectWithoutUserInput;
    upsert?: Prisma.DriverProfileUpsertWithoutUserInput;
    disconnect?: Prisma.DriverProfileWhereInput | boolean;
    delete?: Prisma.DriverProfileWhereInput | boolean;
    connect?: Prisma.DriverProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DriverProfileUpdateToOneWithWhereWithoutUserInput, Prisma.DriverProfileUpdateWithoutUserInput>, Prisma.DriverProfileUncheckedUpdateWithoutUserInput>;
};
export type DriverProfileCreateWithoutUserInput = {
    id?: string;
    vehicleModel: string;
    vehiclePlate: string;
    vehicleColor: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DriverProfileUncheckedCreateWithoutUserInput = {
    id?: string;
    vehicleModel: string;
    vehiclePlate: string;
    vehicleColor: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DriverProfileCreateOrConnectWithoutUserInput = {
    where: Prisma.DriverProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.DriverProfileCreateWithoutUserInput, Prisma.DriverProfileUncheckedCreateWithoutUserInput>;
};
export type DriverProfileUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.DriverProfileUpdateWithoutUserInput, Prisma.DriverProfileUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.DriverProfileCreateWithoutUserInput, Prisma.DriverProfileUncheckedCreateWithoutUserInput>;
    where?: Prisma.DriverProfileWhereInput;
};
export type DriverProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.DriverProfileWhereInput;
    data: Prisma.XOR<Prisma.DriverProfileUpdateWithoutUserInput, Prisma.DriverProfileUncheckedUpdateWithoutUserInput>;
};
export type DriverProfileUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleModel?: Prisma.StringFieldUpdateOperationsInput | string;
    vehiclePlate?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleColor?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DriverProfileUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleModel?: Prisma.StringFieldUpdateOperationsInput | string;
    vehiclePlate?: Prisma.StringFieldUpdateOperationsInput | string;
    vehicleColor?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DriverProfileSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    vehicleModel?: boolean;
    vehiclePlate?: boolean;
    vehicleColor?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["driverProfile"]>;
export type DriverProfileSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    vehicleModel?: boolean;
    vehiclePlate?: boolean;
    vehicleColor?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["driverProfile"]>;
export type DriverProfileSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    vehicleModel?: boolean;
    vehiclePlate?: boolean;
    vehicleColor?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["driverProfile"]>;
export type DriverProfileSelectScalar = {
    id?: boolean;
    userId?: boolean;
    vehicleModel?: boolean;
    vehiclePlate?: boolean;
    vehicleColor?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type DriverProfileOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "vehicleModel" | "vehiclePlate" | "vehicleColor" | "createdAt" | "updatedAt", ExtArgs["result"]["driverProfile"]>;
export type DriverProfileInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DriverProfileIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DriverProfileIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $DriverProfilePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DriverProfile";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        vehicleModel: string;
        vehiclePlate: string;
        vehicleColor: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["driverProfile"]>;
    composites: {};
};
export type DriverProfileGetPayload<S extends boolean | null | undefined | DriverProfileDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DriverProfilePayload, S>;
export type DriverProfileCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DriverProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DriverProfileCountAggregateInputType | true;
};
export interface DriverProfileDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DriverProfile'];
        meta: {
            name: 'DriverProfile';
        };
    };
    findUnique<T extends DriverProfileFindUniqueArgs>(args: Prisma.SelectSubset<T, DriverProfileFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DriverProfileClient<runtime.Types.Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DriverProfileFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DriverProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DriverProfileClient<runtime.Types.Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DriverProfileFindFirstArgs>(args?: Prisma.SelectSubset<T, DriverProfileFindFirstArgs<ExtArgs>>): Prisma.Prisma__DriverProfileClient<runtime.Types.Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DriverProfileFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DriverProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DriverProfileClient<runtime.Types.Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DriverProfileFindManyArgs>(args?: Prisma.SelectSubset<T, DriverProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DriverProfileCreateArgs>(args: Prisma.SelectSubset<T, DriverProfileCreateArgs<ExtArgs>>): Prisma.Prisma__DriverProfileClient<runtime.Types.Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DriverProfileCreateManyArgs>(args?: Prisma.SelectSubset<T, DriverProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DriverProfileCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DriverProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DriverProfileDeleteArgs>(args: Prisma.SelectSubset<T, DriverProfileDeleteArgs<ExtArgs>>): Prisma.Prisma__DriverProfileClient<runtime.Types.Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DriverProfileUpdateArgs>(args: Prisma.SelectSubset<T, DriverProfileUpdateArgs<ExtArgs>>): Prisma.Prisma__DriverProfileClient<runtime.Types.Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DriverProfileDeleteManyArgs>(args?: Prisma.SelectSubset<T, DriverProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DriverProfileUpdateManyArgs>(args: Prisma.SelectSubset<T, DriverProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DriverProfileUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DriverProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DriverProfileUpsertArgs>(args: Prisma.SelectSubset<T, DriverProfileUpsertArgs<ExtArgs>>): Prisma.Prisma__DriverProfileClient<runtime.Types.Result.GetResult<Prisma.$DriverProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DriverProfileCountArgs>(args?: Prisma.Subset<T, DriverProfileCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DriverProfileCountAggregateOutputType> : number>;
    aggregate<T extends DriverProfileAggregateArgs>(args: Prisma.Subset<T, DriverProfileAggregateArgs>): Prisma.PrismaPromise<GetDriverProfileAggregateType<T>>;
    groupBy<T extends DriverProfileGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DriverProfileGroupByArgs['orderBy'];
    } : {
        orderBy?: DriverProfileGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DriverProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDriverProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DriverProfileFieldRefs;
}
export interface Prisma__DriverProfileClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DriverProfileFieldRefs {
    readonly id: Prisma.FieldRef<"DriverProfile", 'String'>;
    readonly userId: Prisma.FieldRef<"DriverProfile", 'String'>;
    readonly vehicleModel: Prisma.FieldRef<"DriverProfile", 'String'>;
    readonly vehiclePlate: Prisma.FieldRef<"DriverProfile", 'String'>;
    readonly vehicleColor: Prisma.FieldRef<"DriverProfile", 'String'>;
    readonly createdAt: Prisma.FieldRef<"DriverProfile", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"DriverProfile", 'DateTime'>;
}
export type DriverProfileFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DriverProfileSelect<ExtArgs> | null;
    omit?: Prisma.DriverProfileOmit<ExtArgs> | null;
    include?: Prisma.DriverProfileInclude<ExtArgs> | null;
    where: Prisma.DriverProfileWhereUniqueInput;
};
export type DriverProfileFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DriverProfileSelect<ExtArgs> | null;
    omit?: Prisma.DriverProfileOmit<ExtArgs> | null;
    include?: Prisma.DriverProfileInclude<ExtArgs> | null;
    where: Prisma.DriverProfileWhereUniqueInput;
};
export type DriverProfileFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DriverProfileSelect<ExtArgs> | null;
    omit?: Prisma.DriverProfileOmit<ExtArgs> | null;
    include?: Prisma.DriverProfileInclude<ExtArgs> | null;
    where?: Prisma.DriverProfileWhereInput;
    orderBy?: Prisma.DriverProfileOrderByWithRelationInput | Prisma.DriverProfileOrderByWithRelationInput[];
    cursor?: Prisma.DriverProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DriverProfileScalarFieldEnum | Prisma.DriverProfileScalarFieldEnum[];
};
export type DriverProfileFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DriverProfileSelect<ExtArgs> | null;
    omit?: Prisma.DriverProfileOmit<ExtArgs> | null;
    include?: Prisma.DriverProfileInclude<ExtArgs> | null;
    where?: Prisma.DriverProfileWhereInput;
    orderBy?: Prisma.DriverProfileOrderByWithRelationInput | Prisma.DriverProfileOrderByWithRelationInput[];
    cursor?: Prisma.DriverProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DriverProfileScalarFieldEnum | Prisma.DriverProfileScalarFieldEnum[];
};
export type DriverProfileFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DriverProfileSelect<ExtArgs> | null;
    omit?: Prisma.DriverProfileOmit<ExtArgs> | null;
    include?: Prisma.DriverProfileInclude<ExtArgs> | null;
    where?: Prisma.DriverProfileWhereInput;
    orderBy?: Prisma.DriverProfileOrderByWithRelationInput | Prisma.DriverProfileOrderByWithRelationInput[];
    cursor?: Prisma.DriverProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DriverProfileScalarFieldEnum | Prisma.DriverProfileScalarFieldEnum[];
};
export type DriverProfileCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DriverProfileSelect<ExtArgs> | null;
    omit?: Prisma.DriverProfileOmit<ExtArgs> | null;
    include?: Prisma.DriverProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DriverProfileCreateInput, Prisma.DriverProfileUncheckedCreateInput>;
};
export type DriverProfileCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DriverProfileCreateManyInput | Prisma.DriverProfileCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DriverProfileCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DriverProfileSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DriverProfileOmit<ExtArgs> | null;
    data: Prisma.DriverProfileCreateManyInput | Prisma.DriverProfileCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DriverProfileIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DriverProfileUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DriverProfileSelect<ExtArgs> | null;
    omit?: Prisma.DriverProfileOmit<ExtArgs> | null;
    include?: Prisma.DriverProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DriverProfileUpdateInput, Prisma.DriverProfileUncheckedUpdateInput>;
    where: Prisma.DriverProfileWhereUniqueInput;
};
export type DriverProfileUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DriverProfileUpdateManyMutationInput, Prisma.DriverProfileUncheckedUpdateManyInput>;
    where?: Prisma.DriverProfileWhereInput;
    limit?: number;
};
export type DriverProfileUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DriverProfileSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DriverProfileOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DriverProfileUpdateManyMutationInput, Prisma.DriverProfileUncheckedUpdateManyInput>;
    where?: Prisma.DriverProfileWhereInput;
    limit?: number;
    include?: Prisma.DriverProfileIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DriverProfileUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DriverProfileSelect<ExtArgs> | null;
    omit?: Prisma.DriverProfileOmit<ExtArgs> | null;
    include?: Prisma.DriverProfileInclude<ExtArgs> | null;
    where: Prisma.DriverProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.DriverProfileCreateInput, Prisma.DriverProfileUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DriverProfileUpdateInput, Prisma.DriverProfileUncheckedUpdateInput>;
};
export type DriverProfileDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DriverProfileSelect<ExtArgs> | null;
    omit?: Prisma.DriverProfileOmit<ExtArgs> | null;
    include?: Prisma.DriverProfileInclude<ExtArgs> | null;
    where: Prisma.DriverProfileWhereUniqueInput;
};
export type DriverProfileDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DriverProfileWhereInput;
    limit?: number;
};
export type DriverProfileDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DriverProfileSelect<ExtArgs> | null;
    omit?: Prisma.DriverProfileOmit<ExtArgs> | null;
    include?: Prisma.DriverProfileInclude<ExtArgs> | null;
};
